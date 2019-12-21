import {
  Client as Nats,
  connect as natsConnect,
  NatsError,
  REQ_TIMEOUT,
  SubscribeOptions
} from 'nats';
import { connect as stanConnect, Message, Stan } from 'node-nats-streaming';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { logger, Logger } from '@hypercentage/logger';
import { ConnectionEvent, NatsMessage } from './connection-event';
import { NatsRouterOptions } from './nats-options';
import {
  DurableSubscriptionOptions,
  SubscriptionOptions
} from './subscription-options';

export class NatsRouter {
  get connectionEvents(): Observable<ConnectionEvent> {
    return this.connectionEvent$.asObservable();
  }

  public readonly connection: Promise<NatsRouter>;

  get isConnected(): boolean {
    return this.isNatsConnected && this.isStanConnected;
  }

  @logger()
  private readonly logger: Logger;

  private readonly nats: Nats;

  private readonly stan: Stan;

  private readonly clientId: string;

  private isNatsConnected = false;

  private isStanConnected = false;

  private readonly connectionEvent$: Subject<ConnectionEvent> = new Subject<ConnectionEvent>();

  constructor(options: NatsRouterOptions) {
    const encoding =
      (options.natsOptions && options.natsOptions.encoding) || 'binary';
    this.clientId = options.clientId || uuidV4();
    this.nats = natsConnect({
      encoding,
      maxReconnectAttempts: -1,
      reconnect: true,
      reconnectTimeWait: 1000,
      servers: options.hosts,
      ...(options.natsOptions || {})
    });
    this.stan = stanConnect(options.clusterId, this.clientId, {
      maxReconnectAttempts: -1,
      nc: this.nats,
      reconnect: true
    });
    this.connection = new Promise(resolve => {
      this.connectionEvent$.subscribe((data: ConnectionEvent) => {
        if (data.source === 'STAN' && data.type === 'connected') {
          resolve(this);
        }
      });
    });
    this.setupConnectionEvents();
    process.on('SIGTERM', async () => {
      await this.drain();
      this.logger.debug("[NATS] finished draining and closed the connections, exiting process now");
      process.exit(1);
    });

    process.on('SIGINT', async () => {
      await this.drain();
      this.logger.debug("[NATS] finished draining and closed the connections, exiting process now");
      process.exit(1);
    });
  }

  public queue<T>(subject: string, msg: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const message = JSON.stringify(msg);
        this.stan.publish(subject, message, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public push<T>(subject: string, msg: T): Promise<void> {
    // logger.debug(`Pushing on subject: ${subject}`);
    return new Promise<void>(resolve => {
      this.nats.publish(subject, msg, () => {
        resolve();
      });
    });
  }

  public subscribePush<T>(subject: string): Observable<T> {
    return new Observable<T>(subscriber => {
      const subscription = this.nats.subscribe(subject, (data: T) =>
        subscriber.next(data)
      );

      return () => {
        this.nats.unsubscribe(subscription);
      };
    });
  }

  public getObservableForSubject<T>(
    subject: string,
    opts?: SubscriptionOptions
  ): Observable<NatsMessage<T>> {
    const queueGroup = subject;

    return new Observable<NatsMessage<T>>(subscriber => {
      const subscription = this.stan.subscribe(subject, queueGroup, {
        ...this.stan.subscriptionOptions(),
        ...(opts || {})
      });

      subscription.on('message', (msg: Message) => {
        const data = new NatsMessage<T>(msg);
        subscriber.next(data);
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  public getObservableForDurableSubject<T>(
    subject: string,
    opts?: DurableSubscriptionOptions
  ): Observable<NatsMessage<T>> {
    // logger.debug('Subscribing to NATS for subject');
    const queueGroup = subject;

    return new Observable<NatsMessage<T>>(subscriber => {
      const subscription = this.stan.subscribe(subject, queueGroup, {
        ...this.stan.subscriptionOptions(),
        durableName: subject,
        ...(opts || {})
      });

      subscription.on('message', (msg: Message) => {
        const data = new NatsMessage<T>(msg);
        subscriber.next(data);
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  public query<Payload, Result>(
    subject: string,
    msg: Payload,
    opts?: SubscribeOptions,
    timeout = 30000
  ): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      let payload;
      try {
        payload = JSON.stringify(msg);
      } catch (e) {
        reject(new Error(`[NatsRouter.query] Failed to stringify payload for query: ${subject}`));
      }
      this.nats.requestOne(
        subject,
        payload,
        opts || {},
        timeout,
        (response: string | NatsError) => {
          if (response instanceof NatsError) {
            if (response.code === REQ_TIMEOUT) {
              reject(response);
            }
            return;
          }
          try {
            const result = JSON.parse(response) as Result;
            resolve(result);
          } catch (e) {
            reject(new Error(`[NatsRouter.query] Failed to parse result from query: ${subject}`));
          }
        }
      );
    });
  }

  public subscribeQuery<Payload, Response>(
    subject: string,
    opts: SubscribeOptions = { max: 1 },
    callback: (val: Payload) => Promise<Response>
  ): void {
    this.nats.subscribe(
      subject,
      opts,
      async (payload: string, replyTo: string) => {
        let result: Response;
        try {
          const value = JSON.parse(payload) as Payload;
          result = await callback(value);
        } catch (e) {
          this.logger.error(`[NatsRouter.subscribeQuery] Failed to parse payload for subject ${subject}`);
        }
        try {
          const str = JSON.stringify(result);
          this.nats.publish(replyTo, str);
        } catch (e) {
          this.logger.error(`[NatsRouter.subscribeQuery] Failed to stringify response for subject ${subject}`)
        }
      }
    );
  }

  public drain(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.nats.drain((error: Error) => {
        this.disconnect();
        this.logger.info("[NATS] Drained all NATS connection", error);
        if (error) {
          this.logger.debug("[NATS] Error thrown when draining nats connection", error);
          reject(false);
        } else {
          resolve(true)
        }
      })
    })
  }


  public disconnect(): void {
    this.stan.close();
    this.nats.close();
    this.isStanConnected = false;
    this.isNatsConnected = false;
  }

  private setupConnectionEvents(): void {
    this.nats.on('error', err => {
      this.logger.debug('[NATS] error ', err);
      this.isNatsConnected = false;
      this.connectionEvent$.next({
        source: 'NATS',
        type: 'error'
      });
    });

    this.nats.on('reconnect', () => {
      this.logger.debug('[NATS] reconnect');
      this.isNatsConnected = true;
      this.connectionEvent$.next({
        source: 'NATS',
        type: 'reconnected'
      });
    });

    this.nats.on('reconnecting', () => {
      this.logger.debug('[NATS] reconnecting');
      this.isNatsConnected = false;
      this.connectionEvent$.next({
        source: 'NATS',
        type: 'reconnecting'
      });
    });

    this.nats.on('disconnect', e => {
      this.logger.debug('[NATS] disconnect', e);
      this.isNatsConnected = false;
      this.connectionEvent$.next({
        source: 'NATS',
        type: 'disconnected'
      });
    });

    this.nats.on('connect', () => {
      this.logger.debug('[NATS] connected');
      this.isNatsConnected = true;
      this.connectionEvent$.next({
        source: 'NATS',
        type: 'connected'
      });
    });

    this.nats.on('close', () => {
      this.logger.debug('[NATS] close ');
      this.isNatsConnected = false;
      this.connectionEvent$.next({
        source: 'NATS',
        type: 'closed'
      });
    });

    this.stan.on('close', error => {
      this.logger.debug('[STAN] close ');
      this.isStanConnected = false;
      this.connectionEvent$.next({
        source: 'STAN',
        type: 'closed'
      });
    });

    this.stan.on('error', error => {
      this.logger.debug('[STAN] error ', error);
      this.isStanConnected = false;
      this.connectionEvent$.next({
        source: 'STAN',
        type: 'error'
      });
    });

    this.stan.on('connect', () => {
      this.logger.debug('[STAN] connected');
      this.logger.debug(`Connected to stan - ${this.clientId}`);
      this.isStanConnected = true;
      this.connectionEvent$.next({
        source: 'STAN',
        type: 'connected'
      });
    });
  }
}

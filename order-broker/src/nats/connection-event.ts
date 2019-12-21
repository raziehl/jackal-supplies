import { Message } from 'node-nats-streaming';

export interface ConnectionEvent {
  /**
   * The source of the connection event
   */
  readonly source: 'NATS' | 'STAN';

  /**
   * The type of the event
   */
  readonly type:
    | 'connected'
    | 'disconnected'
    | 'closed'
    | 'reconnecting'
    | 'reconnected'
    | 'error';
}

export class NatsMessage<T> {
  public readonly data: T;
  public readonly msg: Message;

  constructor(msg: Message) {
    this.msg = msg;
    this.data = JSON.parse(msg.getData() as string) as T;
  }

  public ack(): void {
    this.msg.ack();
  }
}

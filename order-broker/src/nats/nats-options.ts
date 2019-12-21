import { ClientOpts } from 'nats';
import { StanOptions as StanOriginalOptions } from 'node-nats-streaming';

interface NatsOptions extends Omit<ClientOpts, 'servers'> {}

interface StanOptionsWithoutNatsClient
  extends Omit<StanOriginalOptions, 'nc'> {}

interface StanOptions extends Omit<StanOptionsWithoutNatsClient, 'servers'> {}

export interface NatsRouterOptions {
  /**
   * Array of NATS servers to connect
   */
  readonly hosts: string[];

  /**
   * The name of the STAN cluster to connect to.
   */
  readonly clusterId: string;

  /**
   * The client ID used for STAN connection.
   * @default uuid v4
   */
  readonly clientId?: string;

  /**
   * NATS options to override
   */
  readonly natsOptions?: NatsOptions;

  /**
   * STAN options to override
   */
  readonly stanOptions?: StanOptions;
}

import { StartPosition } from 'node-nats-streaming';

export interface SubscriptionOptions {
  readonly maxInFlight?: number;
  readonly ackWait?: number;
  readonly startPosition?: StartPosition;
  readonly startSequence?: number;
  readonly startTime?: number;
  readonly manualAcks?: boolean;
}

export interface DurableSubscriptionOptions extends SubscriptionOptions {
  readonly durableName?: string;
}

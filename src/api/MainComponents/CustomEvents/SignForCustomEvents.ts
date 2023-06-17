import type { FullEvent } from "./CustomEventConstraint";

declare const Composed: unique symbol;
type ComposedEvent = typeof Composed;
declare const Bubbles: unique symbol;
type BubblesEvent = typeof Bubbles;
export type SignOfCustomEvents = ComposedEvent | BubblesEvent;

export type SignForCustomEvents<Options extends FullEvent["options"]> = Options["composed"] extends true ? ComposedEvent
  : Options["bubbles"] extends true ? BubblesEvent
  : never;

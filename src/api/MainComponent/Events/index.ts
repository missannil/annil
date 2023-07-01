import type { EventsConstraint } from "./EventsConstraint";

export type Events<TEvents extends EventsConstraint> = {
  events?: TEvents;
};

import type { V } from "hry-types";

export type EventsOption<TEvents extends object, EventsDoc> = {
  events?:
    & TEvents
    & V.IllegalFieldValidator<TEvents, keyof EventsDoc>;
};

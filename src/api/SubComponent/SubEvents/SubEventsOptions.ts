import type { V } from "hry-types";

export type SubEventsOption<TSubEvents, SubEventsDoc extends object, xxx extends PropertyKey> = {
  events?:
    & TSubEvents
    & V.IllegalFieldValidator<SubEventsDoc, xxx>;
};

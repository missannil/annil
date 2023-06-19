import type { V } from "hry-types";
import type { InstanceInject } from "../../InstanceInject";
import type { EventsConstraint } from "./EventsConstraint";

export type Events<TEvents extends EventsConstraint> = {
  events?:
    & TEvents
    & V.DuplicateFieldValidation<TEvents, keyof InstanceInject["methods"], "与注入的methods字段重复">;
};

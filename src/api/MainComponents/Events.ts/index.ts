import type { DuplicateFieldValidation } from "hry-types/src/Function_generic_value_validation/DuplicateFieldValidation";
import type { IinjectMethodsDoc } from "../../InstanceInject";
import type { EventsConstraint } from "./EventsConstraint";

export type Events<TEvents extends EventsConstraint> = {
  events?:
    & TEvents
    & DuplicateFieldValidation<TEvents, keyof IinjectMethodsDoc, "与注入的methods字段重复">;
};

import type { V } from "hry-types";
import type { InstanceInject } from "../../InstanceInject";
import type { MethodsConstraint } from "./MethodsConstraint";

export type Methods<TMethods extends MethodsConstraint, TEvents, TCustomEvents> = {
  methods?:
    & TMethods
    & V.DuplicateFieldValidation<TMethods, keyof InstanceInject["methods"] & {}, "与注入的methods字段重复">
    & V.DuplicateFieldValidation<TMethods, keyof TEvents, "与events字段重复">
    & V.DuplicateFieldValidation<TMethods, keyof TCustomEvents, "与customEvents字段重复">;
};

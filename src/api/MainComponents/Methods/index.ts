import type { DuplicateFieldValidation } from "hry-types/src/Function_generic_value_validation/DuplicateFieldValidation";
import type { IinjectMethodsDoc } from "../../InstanceInject";
import type { MethodsConstraint } from "./MethodsConstraint";

export type Methods<TMethods extends MethodsConstraint, TEvents, TCustomEvents> = {
  methods?:
    & TMethods
    & DuplicateFieldValidation<TMethods, keyof IinjectMethodsDoc, "与注入的methods字段重复">
    & DuplicateFieldValidation<TMethods, keyof TEvents, "与events字段重复">
    & DuplicateFieldValidation<TMethods, keyof TCustomEvents, "与customEvents字段重复">;
};

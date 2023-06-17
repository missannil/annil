import type { DuplicateFieldValidation } from "hry-types/src/Function_generic_value_validation/DuplicateFieldValidation";
import type { IinjectDataDoc } from "../../InstanceInject";
import type { DataConstraint } from "./DataConstraint";

export type Data<TData extends DataConstraint, TProperties> = {
  data?:
    & TData
    & DuplicateFieldValidation<TData, keyof IinjectDataDoc, "与注入的data字段重复">
    & DuplicateFieldValidation<TData, keyof TProperties, "与properties字段重复">;
};
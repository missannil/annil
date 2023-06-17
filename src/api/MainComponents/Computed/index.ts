import type { DuplicateFieldValidation } from "hry-types/src/Function_generic_value_validation/DuplicateFieldValidation";
import type { IinjectDataDoc } from "../../InstanceInject";
import type { ComputedConstraint } from "./ComputedConstraint";

export type Computed<TComputed extends ComputedConstraint, PropertiesDoc, DataDoc, ComputedDoc> = {
  computed?:
    & TComputed
    & DuplicateFieldValidation<TComputed, keyof IinjectDataDoc, "与注入的data字段重复">
    & DuplicateFieldValidation<TComputed, keyof PropertiesDoc, "与properties字段重复">
    & DuplicateFieldValidation<TComputed, keyof DataDoc, "与data字段重复">
    & ThisType<{
      data: Required<PropertiesDoc> & DataDoc & ComputedDoc;
    }>;
};

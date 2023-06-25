import type { V } from "hry-types";
import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { InstanceInject } from "../../InstanceInject";
import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * @description computed字段输入泛型
 * @returns TComputed
 */
export type Computed<TComputed extends ComputedConstraint, PropertiesDoc, DataDoc, ComputedDoc> = {
  computed?:
    & TComputed
    & V.DuplicateFieldValidation<TComputed, keyof InstanceInject["data"], "与注入的data字段重复">
    & V.DuplicateFieldValidation<TComputed, keyof PropertiesDoc, "与properties字段重复">
    & V.DuplicateFieldValidation<TComputed, keyof DataDoc, "与data字段重复">
    & ThisType<{
      data: MergeIntersection<Required<PropertiesDoc> & DataDoc & ComputedDoc>;
    }>;
};

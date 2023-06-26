import type { PureObject, V } from "hry-types";
import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * @description computed字段输入泛型
 * @returns TComputed
 */
export type Computed<TComputed extends ComputedConstraint, ThisData extends PureObject, ComputedDoc> = {
  computed?:
    & TComputed
    & V.DuplicateFieldValidation<TComputed, keyof ThisData>
    & ThisType<{
      data: MergeIntersection<ThisData & ComputedDoc>;
    }>;
};

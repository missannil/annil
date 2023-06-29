import type { V } from "hry-types";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * @description computed字段输入泛型
 * @returns TComputed
 */
export type Computed<TComputed extends ComputedConstraint, ThisData extends object, ComputedDoc> = {
  computed?:
    & TComputed
    & V.DuplicateFieldValidator<TComputed, keyof ThisData>
    & ThisType<{
      data: ComputeIntersection<ThisData & ComputedDoc>;
    }>;
};

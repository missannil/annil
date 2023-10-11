import type { DuplicateFieldValidator } from "hry-types/src/Generic/DuplicateFieldValidator";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/_api";
import type { ComputedConstraint } from "./ComputedConstraint";

export type ComputedOption<TComputed extends ComputedConstraint, OtherData extends object, ComputedDoc> = {
  /**
   * 计算属性字段,可通过this.data获取其他数据(只读)
   */
  computed?:
    & TComputed
    & ThisType<{
      data: ReadonlyDeep<ComputeIntersectionDeep<OtherData & ComputedDoc>>;
    }>
    & DuplicateFieldValidator<TComputed, keyof OtherData>;
};

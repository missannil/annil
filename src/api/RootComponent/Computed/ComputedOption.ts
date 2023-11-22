import type { DuplicateFieldValidator } from "hry-types/src/Generic/DuplicateFieldValidator";

import type { ComputedConstraint } from "./ComputedConstraint";

export type ComputedOption<TComputed extends ComputedConstraint, OtherData extends object> = {
  /**
   * 计算属性字段,可通过this.data获取其他数据
   */
  computed?:
    & TComputed
    & DuplicateFieldValidator<TComputed, keyof OtherData>;
};

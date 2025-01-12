import type { SlotComputedConstraint } from "./SlotComputedConstraint";
/**
 * 获取computed字段文档类型
 * @param T - ComputedConstraint
 * @returns object
 */
export type GetSlotComputedDoc<TComputed extends SlotComputedConstraint> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};

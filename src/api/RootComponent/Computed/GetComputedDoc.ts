import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * 获取computed字段文档类型
 * @param T - ComputedConstraint
 * @returns object
 */
export type GetComputedDoc<TComputed extends ComputedConstraint> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};

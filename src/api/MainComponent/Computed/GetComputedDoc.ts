import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * @description 获取computed字段文档类型
 * @param T ComputedConstraint
 * @returns AnyObject
 */
export type GetComputedDoc<TComputed extends ComputedConstraint> = { [k in keyof TComputed]: ReturnType<TComputed[k]> };

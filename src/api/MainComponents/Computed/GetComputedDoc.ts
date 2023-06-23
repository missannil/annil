import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * 获取TComputed文档类型
 * @returns AnyObject
 */
export type GetComputedDoc<TComputed extends ComputedConstraint> = { [k in keyof TComputed]: ReturnType<TComputed[k]> };

import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * 获取TComputed文档类型(空对象返回unknown)
 * @returns IComputedDoc | unknown
 */
export type GetComputedDoc<TComputed extends ComputedConstraint> = { [k in keyof TComputed]: ReturnType<TComputed[k]> };

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputedConstraint } from "./ComputedConstraint";

/**
 * 获取TComputed文档类型(空对象返回unknown)
 * @returns object
 */
export type GetComputedDoc<TComputed extends ComputedConstraint = ComputedConstraint> = IfExtends<
  ComputedConstraint,
  TComputed,
  unknown,
  { [k in keyof TComputed]: ReturnType<TComputed[k]> }
>;

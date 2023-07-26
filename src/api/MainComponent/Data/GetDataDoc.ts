import type { A, O } from "hry-types";

/**
 *  ReturnTypes
 */
type ReturnTypes = "去掉函数字段" | "返回函数字段" | "函数值类型变为函数返回类型";

/**
 * 获取data字段文档类型
 * @param T - DataConstraint
 * @param TType - ReturnTypes
 * @returns NonArrNonFuncObject
 */ export type GetDataDoc<
  TData extends object,
  Type extends ReturnTypes = "函数值类型变为函数返回类型",
> = A.IfExtends<
  Type,
  "函数值类型变为函数返回类型",
  O.ReturnTypeInObject<TData>,
  A.IfExtends<
    Type,
    "去掉函数字段",
    A.IfEquals<O.Filter<TData, Function>, {}, {}>,
    // "返回函数字段"
    O.Select<TData, Function>
  >
>;

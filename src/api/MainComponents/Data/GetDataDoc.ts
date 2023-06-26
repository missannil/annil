import type { A, O } from "hry-types";
import type { DataConstraint } from "./DataConstraint";

/**
 *  @description ReturnTypes
 */
type ReturnTypes = "去掉函数字段" | "返回函数字段" | "函数值类型变为函数返回类型";

/**
 * @description 获取data字段文档类型
 * @param T DataConstraint
 * @param TType ReturnTypes
 * @returns AnyObject
 */ export type GetDataDoc<
  TData extends DataConstraint,
  Type extends ReturnTypes = "函数值类型变为函数返回类型",
> = A.IfExtends<
  Type,
  "函数值类型变为函数返回类型",
  O.ReturnTypeInObject<TData>,
  A.IfExtends<
    Type,
    "去掉函数字段",
    A.IfEquals<O.Filter<TData, AnyFunction>, {}, unknown>,
    // "返回函数字段"
    O.Select<TData, AnyFunction>
  >
>;

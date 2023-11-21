import type { O } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Func } from "hry-types/src/Misc/Func";

/**
 * 获取data字段文档类型
 * @param TData - `DataConstraint`
 * @param Type - "去掉函数字段" | "返回函数字段" | "函数值类型变为函数返回类型"
 * @returns object
 */
export type GetDataDoc<
  TData extends object,
  Type extends "去掉函数字段" | "返回函数字段" | "函数值类型变为函数返回类型" = "函数值类型变为函数返回类型",
> = IfExtends<
  Type,
  "函数值类型变为函数返回类型",
  O.ReturnTypeInObject<TData>,
  IfExtends<
    Type,
    "去掉函数字段",
    O.Filter<TData, Func>,
    // "返回函数字段"
    O.Select<TData, Func>
  >
>;

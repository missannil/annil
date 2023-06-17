import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Filter } from "hry-types/src/Object/Filter";
import type { ReturnTypeInObject } from "hry-types/src/Object/ReturnTypeInObject";
import type { Select } from "hry-types/src/Object/Select";
import type { DataConstraint } from "./DataConstraint";
/**
 * @description 要获取TData字段的类型
 */
export type GetDataKeyTypes = "去掉函数字段" | "返回函数字段" | "函数值类型变为函数返回类型";
/**
 * 获取data字段文档
 * @param T DataConstraint
 * @returns unknown | IDataDoc
 */ export type GetDataDoc<
  TData extends DataConstraint,
  TType extends GetDataKeyTypes = "函数值类型变为函数返回类型",
> = IfExtends<
  TType,
  "函数值类型变为函数返回类型",
  ReturnTypeInObject<TData>,
  IfExtends<
    TType,
    "去掉函数字段",
    IfEquals<Filter<TData, AnyFunction>, {}, unknown>,
    // "返回函数字段"
    Select<TData, Function>
  >
>;

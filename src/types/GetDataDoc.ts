import {
  ExpectType,
  type Filter,
  type IfEquals,
  type IfExtends,
  type ReturnTypeOfProperty,
  type Select,
} from "../../hry-types";
import type { DataConstraint, GetDataKeyTypes } from "./Data";

/**
 * 获取data字段文档
 * @param T DataConstraint
 * @returns unknown | IDataDoc
 */ export type GetDataDoc<
  TData extends DataConstraint,
  TType extends GetDataKeyTypes = "函数值类型变为函数返回类型",
> = IfExtends<
  {},
  TData,
  unknown,
  IfExtends<
    DataConstraint,
    TData,
    unknown,
    IfExtends<
      TType,
      "函数值类型变为函数返回类型",
      ReturnTypeOfProperty<TData>,
      IfExtends<
        TType,
        "去掉函数字段",
        IfEquals<Filter<TData, AnyFunction>, {}, unknown>,
        // "返回函数字段"
        Select<TData, Function>
      >
    >
  >
>;
// test
type data = { a: () => number; b: number; c: string };

ExpectType<GetDataDoc<data>, { a: number; b: number; c: string }, true>;
ExpectType<GetDataDoc<data, "去掉函数字段">, { b: number; c: string }, true>;
ExpectType<GetDataDoc<data, "返回函数字段">, { a: () => number }, true>;

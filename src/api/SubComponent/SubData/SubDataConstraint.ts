import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentDoc } from "../../../types/ComponentDoc";
export type ResponseData<T = unknown> = [T] extends [unknown] ? () => T : never;

export type AddResponseData<T extends object> = {
  [k in keyof T]?: ResponseData<T[k]> | T[k];
};

/**
 * 子组件Data字段约束
 * @returns 当TCurrentComponentDoc为{}时(即传入的TComponentDoc为any) 返回 object
 * @returns 当TCurrentComponentDoc["properties"]为unknown时,返回  EmptyObject
 * @returns 当TCurrentComponentDoc["properties"]不为unknown时,返回 去除properties剩余字段和内部字段
 */
export type SubDataConstraint<
  TCurrentComponentDoc extends ComponentDoc,
  TExcludeFields extends PropertyKey,
  Rest extends object = Omit<Required<TCurrentComponentDoc["properties"]>, TExcludeFields>,
> = IfExtends<
  {},
  TCurrentComponentDoc,
  Record<string, unknown>,
  IfExtends<
    unknown,
    TCurrentComponentDoc["properties"],
    EmptyObject,
    IfExtends<{}, Rest, EmptyObject, AddResponseData<Rest>>
  > // | { [k in `_${TPrefix}_${string}`]: unknown }
>;

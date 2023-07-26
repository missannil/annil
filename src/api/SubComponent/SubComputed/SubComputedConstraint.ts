// export type SubComponentConstraint = Record<string, () => void>;

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentDoc } from "../../../types/ComponentDoc";

/**
 * 子组件computed字段约束
 * @returns
 * 1. 当TCurrentComponentDoc为`{}`时(即传入的TComponentDoc为any) 返回 `Record<string, () => void>`
 * 2. 当TCurrentComponentDoc["properties"]为unknown时,返回  `EmptyObject`
 * 3. 当TCurrentComponentDoc["properties"]不为unknown时,返回 去除`properties`剩余字段和内部字段
 */
export type SubComponentConstraint<
  TCurrentComponentDoc extends ComponentDoc,
  TExcludeFields extends PropertyKey,
  Rest extends object = Omit<Required<TCurrentComponentDoc["properties"]>, TExcludeFields>,
> = IfExtends<
  {},
  TCurrentComponentDoc,
  Record<string, () => void>,
  IfExtends<
    unknown,
    TCurrentComponentDoc["properties"],
    EmptyObject,
    IfExtends<{}, Rest, EmptyObject, { [k in keyof Rest]?: (() => Rest[k]) }>
  >
>;

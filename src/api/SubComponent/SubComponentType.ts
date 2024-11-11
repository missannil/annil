import type { SelectKeys } from "hry-types/src/Object/_api";
import type { Composed, CustomEventsTags } from "../RootComponent/CustomEvents/CustomEventsTag";

type _SubComponentType = {
  [k in string]:
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Record<string, any>
    | unknown[]
    | CustomEventsTags;
};

type _Validator<O, ErrKeys = Exclude<keyof O, SelectKeys<O, Composed, "contains->">>> = [ErrKeys] extends [never]
  ? _SubComponentType
  : `${ErrKeys & string} 不是穿透事件`;

/**
 * SubComponent API 返回类型
 * @remarks 穿透的子组件自定义事件
 * ```ts
 * SubComponentDoc = {
 *  [k in string]: string | number | bigint | boolean | symbol | null | Record<string, unknown> | unknown[] | CustomEventsTags;
 * };
 * ```
 */
export type SubComponentType<O extends _Validator<O> = _SubComponentType> = O;

import type { Func } from "hry-types/src/Misc/_api";
import type { CustomEventsTags } from "../RootComponent/CustomEvents/CustomEventsTag";

type _CustomComponentType = {
  composedEvents?: Record<
    string,
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
    | CustomEventsTags
  >;
  allDatas?: Record<string, unknown>;
  methods?: Record<string, Func>;
  events?: Record<string, Func>;
};

// type _Validator<O, ErrKeys = Exclude<keyof O, SelectKeys<O, Composed, "contains->">>> = [ErrKeys] extends [never]
//   ? _CustomComponentType
//   : `${ErrKeys & string} 不是穿透事件`;

/**
 * CustomComponent API 返回类型
 * @remarks 穿透的子组件自定义事件
 * ```ts
 * CustomComponentDoc = {
 *  [k in string]: string | number | bigint | boolean | symbol | null | Record<string, unknown> | unknown[] | CustomEventsTags;
 * };
 * ```
 */
export type CustomComponentType<O extends _CustomComponentType = _CustomComponentType> = O;

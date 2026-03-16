import type { CustomEventsTags } from "../RootComponent/CustomEvents/CustomEventsTag";

type _CustomComponentReturnType = {
  composedEvents?: Record<
    string,
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined
    | Record<string, unknown>
    | unknown[]
    | CustomEventsTags
  >;
};
/**
 * CustomComponent API 的返回类型
 */
export type CustomComponentReturnType<O extends _CustomComponentReturnType = _CustomComponentReturnType> = O;

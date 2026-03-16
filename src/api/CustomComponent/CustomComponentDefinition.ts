import type { CustomEventsTags } from "../RootComponent/CustomEvents/CustomEventsTag";

type _CustomComponentDefinition = {
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
export type CustomComponentDefinition<O extends _CustomComponentDefinition = _CustomComponentDefinition> = O;

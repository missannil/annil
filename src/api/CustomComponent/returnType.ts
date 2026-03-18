import type { Func } from "hry-types/src/Misc/Func";
import type { ComputedConstraint } from "../RootComponent/Computed/ComputedConstraint";
import type { CustomEventsTags } from "../RootComponent/CustomEvents/CustomEventsTag";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";

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

// 验证key是否合法
type _Validator<O, Doc, ErrKeys = Exclude<keyof O, keyof Doc>> = [ErrKeys] extends [never] ? Doc
  : `错误的字段${ErrKeys & string}`;
/**
 * CustomComponent API 的返回类型
 */
export type CustomComponentDefinition<
  O extends _Validator<O, _CustomComponentDefinition> = _CustomComponentDefinition,
> = O;
/**
 * CustomComponent API 返回的运行时类型
 */
export type CustomComponentDefinitionRuntime = {
  inhrit?: string;
  data?: DataConstraint;
  computed?: ComputedConstraint;
  store?: StoreConstraint;
  events?: EventsConstraint;
  methods?: MethodsConstraint;
  observers?: Record<string, Func>;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?:
    | PageLifetimesOption<false, object>["pageLifetimes"]
    | PageLifetimesOption<true, object>["pageLifetimes"];
};
// import type { CustomComponentRuntime } from "../CustomComponent";

import type { WMCompPageLifetimes, WMPageLifetimes } from "../../types/OfficialTypeAlias";
import type { ValidateKnownKeys } from "../../types/ValidateKnownKeys";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
import type { DataConstraint } from "./Data/DataConstraint";
import type { EventsConstraint } from "./Events/EventsConstraint";
import type { LifetimesConstraint } from "./Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "./Methods/MethodsConstraint";
import type { PropertiesConstraint } from "./Properties/PropertiesConstraint";
import type { SharedRuntimeOptions } from "./SharedRuntimeOptions";
import type { StoreConstraint } from "./Store/StoreConstraint";

type _RootComponentDefinition = {
  isPage?: boolean;
  properties?: object;
  data?: object;
  computed?: object;
  customEvents?: object;
  methods?: object;
  events?: object;
  store?: object;
  watch?: Record<string, AnyFunction>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: AnyFunction }> | Partial<WMPageLifetimes>;
  externalClasses?: string[];
  export?: () => void; // behaviors 'wx://component-export' 使用
};

/**
 * RootComponent Api 的返回类型
 */
export type RootComponentDefinition<
  O extends ValidateKnownKeys<O, _RootComponentDefinition> = _RootComponentDefinition,
> = O;

/**
 * RootComponent API 返回的运行时类型
 */
export type RootComponentDefinitionRuntime = SharedRuntimeOptions & {
  isPage?: boolean;
  properties?: PropertiesConstraint;
  data?: DataConstraint;
  computed?: ComputedConstraint;
  customEvents?: CustomEventConstraint;
  methods?: MethodsConstraint;
  events?: EventsConstraint;
  store?: StoreConstraint;
};

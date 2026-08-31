import type { ValidateKnownKeys } from "../../types/ValidateKnownKeys";
import type { ComputedConstraint } from "../RootComponent/Computed/ComputedConstraint";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { SharedRuntimeOptions } from "../RootComponent/SharedRuntimeOptions";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";

type _CustomComponentDefinition = {
  composedEvents?: Record<string, unknown>;
};

/**
 * CustomComponent API 的返回类型
 */
export type CustomComponentDefinition<
  O extends ValidateKnownKeys<O, _CustomComponentDefinition> = _CustomComponentDefinition,
> = O;
/**
 * CustomComponent API 返回的运行时类型
 */
export type CustomComponentDefinitionRuntime = SharedRuntimeOptions & {
  inherit?: string;
  data?: DataConstraint;
  computed?: ComputedConstraint;
  store?: StoreConstraint;
  events?: EventsConstraint;
  methods?: MethodsConstraint;
};

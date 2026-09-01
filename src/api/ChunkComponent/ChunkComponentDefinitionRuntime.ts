import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { SharedRuntimeOptions } from "../RootComponent/SharedRuntimeOptions";
import type { ChunkComputedConstraint } from "./ChunkComputed/ChunkComputedConstraint";
import type { ChunkStoreConstraint } from "./ChunkStore/ChunkStoreConstraint";

export type ChunkComponentDefinitionRuntime = SharedRuntimeOptions & {
  data?: DataConstraint;
  computed?: ChunkComputedConstraint;
  methods?: MethodsConstraint;
  events?: EventsConstraint;
  store?: ChunkStoreConstraint;
};

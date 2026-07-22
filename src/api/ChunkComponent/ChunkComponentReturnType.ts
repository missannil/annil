import type { Func } from "hry-types/src/Misc/_api";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { ChunkComputedConstraint } from "./ChunkComputed/ChunkComputedConstraint";
import type { ChunkStoreConstraint } from "./ChunkStore/ChunkStoreConstraint";

export type ChunkComponentReturnType = {
  data?: DataConstraint;
  computed?: ChunkComputedConstraint;
  methods?: MethodsConstraint;
  events?: EventsConstraint;
  store?: ChunkStoreConstraint;
  observers?: Record<string, Func>;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  behaviors?: string[];
  pageLifetimes?:
    | PageLifetimesOption<false, object>["pageLifetimes"]
    | PageLifetimesOption<true, object>["pageLifetimes"];
};

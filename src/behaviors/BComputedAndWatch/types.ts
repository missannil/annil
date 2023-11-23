import type { Func } from "hry-types/src/Misc/Func";
import type { ComponentInstance, PageInstance } from "../../api/RootComponent/Instance/RootComponentInstance";
import type { ComputedDependence } from "./initComputed";

export type InstanceCustomFields = {
  __pendingSetData__?: object | null;
  __storeConfig__?: () => Record<string, () => unknown>;
  __computedStatus__?: "初始化中" | "待更新" | "更新完毕";
  __computedUpdater__: Func;
  __computedConfig__?: () => Record<string, Func>;
  __computedCache__?: ComputedCache;
  __watchOldValue__?: WatchOldValue;
  __watchConfig__?: () => Record<string, Func>;
  disposer: Record<string, Func>;
};

export type Instance = (ComponentInstance | PageInstance) & InstanceCustomFields;

export type ComputedCache = Record<
  string,
  {
    dependences: ComputedDependence[];
    method: Func;
    value: unknown;
  }
>;

export type WatchOldValue = Record<string, unknown>;

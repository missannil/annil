import type { Func } from "hry-types/src/Misc/Func";
import type { ComponentInstance, PageInstance } from "../../api/RootComponent/Instance/RootComponentInstance";
import type { ComputedDependence } from "./initComputed";

export type InstanceCustomFields = {
  __pendingSetData__?: object | null;
  __storeConfig__?: () => Record<string, () => unknown>;
  __computedStatus__?: "待更新" | "更新完毕";
  __computedUpdater__: Func;
  __computedInitCache__?: () => ComputedCache;
  __computedCache__: ComputedCache | undefined;
  __watchOldValue__?: WatchOldValue;
  __watchConfig__?: () => Record<string, Func>;
  __compLoadList__?: Func[];

  __prePropertiesValue__: object | undefined;
  __setDataFromInner__?: boolean;
  disposer: Record<string, Func>;
};

export type Instance = (ComponentInstance | PageInstance) & InstanceCustomFields;

export type ItemCache = {
  dependences: ComputedDependence[];
  method: Func;
  value: unknown;
};

export type ComputedCache = Record<string, ItemCache>;

export type WatchOldValue = Record<string, unknown[]>;

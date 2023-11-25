import type { Instance, WatchOldValue } from "../behaviors/BComputedAndWatch/types";
import { deepClone } from "./deepClone";
import { getPathsValue } from "./getPathsValue";

export function initWatchOldValue(this: Instance, watchConfig: object): WatchOldValue {
  const watchOldValue = {};
  for (const key in watchConfig) {
    watchOldValue[key] = deepClone(getPathsValue.call(this, key.split(".")));
  }

  return watchOldValue;
}

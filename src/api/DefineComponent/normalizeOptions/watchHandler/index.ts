import type { Func } from "hry-types/src/Misc/Func";
import { deepClone, deepEqual, isEmptyObject, nonNullable } from "../../../../utils/_utils";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent, WatchOldValue } from "..";
import { getPathsValue } from "./getPathsValue";
import { getPropertiesValue } from "./getPropertiesValue";
import { hasComputedPath } from "./hasComputedPath";

function initWatchOldValue(
  data: FinalOptionsOfComponent["data"],
  watchConfig: object,
  computedKeys: string[],
): WatchOldValue {
  const watchOldValue: WatchOldValue = {};
  for (const path in watchConfig) {
    // 有计算属性的路径,跳过会在计算属性初始化后赋值
    if (hasComputedPath(path, computedKeys)) continue;
    watchOldValue[path] = deepClone(getPathsValue(data, path));
  }

  return watchOldValue;
}
function observerHandler(
  this: Instance,
  key: string,
  originObserversHandle: Func | undefined,
  watchHadle: Func,
  ...newValue: unknown[]
) {
  originObserversHandle?.call(this, ...newValue);
  const watchOldValue = nonNullable(this.data.__watchOldValue__);
  const oldValue = watchOldValue[key];
  if (deepEqual(newValue, oldValue)) return;
  watchOldValue[key] = deepClone(newValue);
  watchHadle.call(this, ...newValue, ...oldValue);
}
export function watchHandler(
  finalOptionsForComponent: FinalOptionsOfComponent,
) {
  const { observers: observersConfig, watch: watchConfig, data, properties, computed: computedConfig } =
    finalOptionsForComponent;
  if (!isEmptyObject(watchConfig)) {
    const rawPropertiesValue = getPropertiesValue(properties);
    const computedKeys = Object.keys(computedConfig);
    data.__watchOldValue__ = initWatchOldValue({ ...data, ...rawPropertiesValue }, watchConfig, computedKeys);
    for (const key in watchConfig) {
      const watchHadle = watchConfig[key];
      const originObserversHandle = observersConfig[key] as Func | undefined;
      // 在监控多个数据时,参数是多个值
      observersConfig[key] = function(this: Instance, ...newValue: unknown[]) {
        if (this.data.__computedInited__) {
          observerHandler.call(this, key, originObserversHandle, watchHadle, ...newValue);
        } else {
          (this.data.__oberverHandler__ ||= []).push(
            observerHandler.bind(this, key, originObserversHandle, watchHadle, ...newValue),
          );
        }
      };
    }
  }
}

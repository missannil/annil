import type { Func } from "hry-types/src/Misc/Func";
import { computedUpdater } from "./computedUpdater";
import { getPathsValue } from "./getPathsValue";
import { getPropertiesValue } from "./getPropertiesValue";
import { initComputed } from "./initComputed";
import { isEqual } from "./isEqual";

import { deepClone } from "../../../../utils/deepClone";
import { isEmptyObject } from "../../../../utils/isEmptyObject";
import type { FinalOptionsOfComponent, Instance } from "..";

type WatchOldValue = Record<string, unknown[]>;

function initWatchOldValue(data: FinalOptionsOfComponent["data"], watchConfig: object): WatchOldValue {
  const watchOldValue = {};
  for (const key in watchConfig) {
    // watchOldValue[key] = deepClone(getPathsValue(data, key));

    // watchOldValue[key] = getPathsValue(data, key);

    // @ts-ignore 隐式索引
    watchOldValue[key] = deepClone(getPathsValue(data, key));
  }

  return watchOldValue;
}
export function computedWatchHandle(options: FinalOptionsOfComponent) {
  // 计算属性初始化
  const computedConfig = options.computed;
  const rawPropertiesValue = getPropertiesValue(options.properties);
  if (computedConfig && !isEmptyObject(computedConfig)) {
    // 此时store已经初始化数据到data了

    const __computedInitCache__ = initComputed(options, computedConfig, { ...options.data, ...rawPropertiesValue });

    options.data.__computedCache__ = __computedInitCache__;

    options.methods.__computedUpdater__ = computedUpdater;
    //    // 把计算属性缓存从方法中带入到实例中,在created周期加入实例后删除
    //    methodOpt.__computedInitCache__ = () => computedCache;
  }
  const observersConfig = options.observers;
  // 通过observers加入`**`字段来触发计算属性更新
  const originalFunc = observersConfig["**"] as Func | undefined;

  observersConfig["**"] = function(this: Instance): undefined {
    this.__computedUpdater__?.();

    originalFunc && originalFunc.call(this);
  };

  // watch handle
  const watchConfig = options.watch;

  if (watchConfig && !isEmptyObject(watchConfig)) {
    const data = options.data;

    data.__watchOldValue__ = initWatchOldValue({ ...data, ...rawPropertiesValue }, watchConfig);

    const observersConfig = options.observers;
    for (const key in watchConfig) {
      const watchHadle = watchConfig[key];
      const originObserversHandle = observersConfig[key] as Func | undefined;

      // 在监控多个数据时,参数是多个值
      observersConfig[key] = function(this: Instance, ...newValue: unknown[]) {
        originObserversHandle && originObserversHandle.call(this, ...newValue);

        const watchOldValue = this.data.__watchOldValue__!;
        const oldValue = watchOldValue[key];

        if (isEqual(newValue, oldValue)) return;
        watchOldValue[key] = deepClone(newValue);

        watchHadle.call(this, ...newValue, ...oldValue);
      };
    }
  }
}

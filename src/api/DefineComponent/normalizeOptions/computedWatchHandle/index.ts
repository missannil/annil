import type { Func } from "hry-types/src/Misc/Func";
import { deepEqual } from "../../../../utils/deepEqual";
import { computedUpdater } from "./computedUpdater";
import { getPathsValue } from "./getPathsValue";
import { getPropertiesValue } from "./getPropertiesValue";
import { initComputedAndGetCache } from "./initComputedAndGetCache";

import { deepClone } from "../../../../utils/deepClone";
import { isEmptyObject } from "../../../../utils/isEmptyObject";
import { nonNullable } from "../../../../utils/nonNullable";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from "..";

type WatchOldValue = Record<string, unknown[]>;

function initWatchOldValue(data: FinalOptionsOfComponent["data"], watchConfig: object): WatchOldValue {
  const watchOldValue = {};
  for (const key in watchConfig) {
    // @ts-ignore 隐式索引
    watchOldValue[key] = deepClone(getPathsValue(data, key));
  }

  return watchOldValue;
}
export function computedWatchHandle(options: FinalOptionsOfComponent) {
  // 计算属性初始化和首次依赖收集
  const computedConfig = options.computed;
  const rawPropertiesValue = getPropertiesValue(options.properties);
  if (computedConfig && !isEmptyObject(computedConfig)) {
    // 此时store已经初始化数据到data了(__storeConfig__)

    const __computedInitCache__ = initComputedAndGetCache(options, computedConfig, {
      ...options.data,
      ...rawPropertiesValue,
    });

    // 缓存放入data中
    options.data.__computedCache__ = __computedInitCache__;

    // 计算属性更新函数放入methods中 要做冲突判断,避免用户定义了同名methods字段
    options.methods.__computedUpdater__ = computedUpdater;
  }
  const observersConfig = options.observers;
  // 通过observers加入`**`字段来触发计算属性更新
  const originalFunc = observersConfig["**"] as Func | undefined;

  observersConfig["**"] = function(this: Instance): undefined {
    // 任何setData都会触发计算属性更新(可能依赖数据并没变化)
    this.__computedUpdater__?.();

    originalFunc?.call(this);
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
        originObserversHandle?.call(this, ...newValue);

        const watchOldValue = nonNullable(this.data.__watchOldValue__);
        const oldValue = watchOldValue[key];

        if (deepEqual(newValue, oldValue)) return;
        watchOldValue[key] = deepClone(newValue);

        watchHadle.call(this, ...newValue, ...oldValue);
      };
    }
  }
}

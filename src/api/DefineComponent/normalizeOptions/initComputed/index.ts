import type { Func } from "hry-types/src/Misc/Func";
import { isEmptyObject } from "../../../../utils/isEmptyObject";
import { nonNullable } from "../../../../utils/nonNullable";
import type { ComputedConstraint } from "../../../RootComponent/Computed/ComputedConstraint";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import { getPathsValue } from "../watchHandler/getPathsValue";
import { hasComputedPath } from "../watchHandler/hasComputedPath";
import { initComputedAndGetCache } from "./initComputedAndGetCache";
// function initWatchOldValue(this: Instance, watchConfig: object): WatchOldValue {
//   const watchOldValue: Record<string, unknown[]> = {};
//   for (const key in watchConfig) {
//     watchOldValue[key] = deepClone(getPathsValue(this.data, key));
//   }

//   return watchOldValue;
// }

/**
 * 初始化会在2个时间渲染,一个是observers.**的回调函数,一个是attached周期。
 * @param computedConfig
 * @param watchConfig
 * @param mark
 * @returns
 */
export function initComputed(
  computedConfig: ComputedConstraint | undefined,
  watchConfig: Record<string, Func>,
  // mark?: string,
) {
  return function(this: Instance) {
    // __computedCache__ 用来避免重复初始化。
    if (!computedConfig || this.data.__computedInitializing__ === true) return;
    this.data.__computedInitializing__ = true;

    const __computedInitCache__ = initComputedAndGetCache.call(this, computedConfig);
    // 缓存放入data中
    this.data.__computedCache__ = __computedInitCache__;
    // 为__watchOldValue__赋值(watchPath中包含计算属性的值的key)

    if (!isEmptyObject(watchConfig)) {
      // 有watchConfig配置时,watchOldValue已经初始过了,所以必有__watchOldValue__
      const watchOldValue: Record<string, unknown[]> = nonNullable(this.data.__watchOldValue__);
      for (const path in watchConfig) {
        // 只针对watchPath中包含计算属性的值的key进行赋值
        if (hasComputedPath(path, Object.keys(computedConfig))) {
          // @ts-ignore
          watchOldValue[path] = getPathsValue(this.data, path);
        }
      }
    }
    //   watch回调时会判断__computedInited__是否为true,如果为false则不执行watch回调
    this.data.__computedInited__ = true;
  };
}

import type { Func } from "hry-types/src/Misc/Func";

import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { ComputedDependence } from "./computedUpdater";
import { deepProxy, getOriginalValue } from "./data-tracer";
import { removeSubDependences } from "./dependencesOptimize";

type ItemCache = {
  dependences: ComputedDependence[];
  method: Func;
  value: unknown;
};

type ComputedId = string;

export type ComputedCache = Record<ComputedId, ItemCache>;

/**
 * 如果依赖列表某项的首个字段值为undefined并且字段为其他计算属性字段(即被依赖的计算字段写在了依赖他的计算字段后面) 返回false, 否则返回true表示依赖有效。
 */
function isValidDependences(dependences: ComputedDependence[], computedKeys: string[]): boolean {
  for (const { paths: path, val } of dependences) {
    if ((val === undefined) && computedKeys.includes(path[0])) {
      return false;
    }
  }

  // 依赖有效
  return true;
}
export function _initComputedAndGetCache(
  this: Instance,
  computedConfig: Record<string, Func>,
  uninitedkeys: string[] = Object.keys(computedConfig),
  computedCache: ComputedCache = {},
): ComputedCache {
  for (const key of uninitedkeys) {
    const computedFunc = computedConfig[key];
    const dependences: ComputedDependence[] = [];
    const proxyThis = new Proxy(this, {
      get(target, prop: string, receiver) {
        if (prop === "data") {
          return deepProxy(target.data, dependences);
        }
        return Reflect.get(target, prop, receiver);
      },
      set() {
        throw "不可以在计算属性中修改实例的属性";
      },
    });
    // 通过代理data获取计算字段的初始值和依赖
    let initValue = computedFunc.call(proxyThis);

    // 去除当前已初始的计算属性key
    uninitedkeys = uninitedkeys.filter(ele => ele !== key);

    // 验证依赖是否有效
    if (isValidDependences(dependences, uninitedkeys)) {
      initValue = getOriginalValue(initValue);
      // 把计算属性初始值加入到data中 此时会引起watch和observers触发
      this.setData({
        [key]: initValue,
      });
      computedCache[key] = {
        dependences: removeSubDependences(dependences),
        method: computedFunc,
        value: initValue,
      };
    } else {
      // 把当前依赖不正确的key放到后面去
      uninitedkeys.push(key);
    }
  }
  // 看uninitedkey是否未空，空表示所有依赖收集完毕直接返回
  if (uninitedkeys.length === 0) {
    return computedCache;
  }

  // uninitedkey不为空,递归调用
  return _initComputedAndGetCache.call(this, computedConfig, uninitedkeys, computedCache);
}

/**
 * 把计算属性初始值setData并返回缓存
 * @param this
 * @param computedConfig 计算属性配置
 */
export function initComputedAndGetCache(
  this: Instance,
  computedConfig: Record<string, Func>,
): ComputedCache {
  return _initComputedAndGetCache.call(this, computedConfig, Object.keys(computedConfig), {});
}

import type { Func } from "hry-types/src/Misc/Func";
import type { FinalOptionsOfComponent } from "..";

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

/**
 * 把计算属性初始值加入到options.data中并返回缓存(递归函数)
 * @param options - 配置选项
 * @param computedConfig - 计算字段配置
 * @param initAllData - 初始化时全部的data包含(properties,data,和已经初始化后的computed字段)
 * @param uninitedkeys - 未初始化的key (默认为所有computedConfig的key)
 * @param computedCache - 返回的所有计算字段缓存(默认为空对象)
 * @returns  `computedCache` 计算字段缓存
 */
export function initComputedAndGetCache(
  options: FinalOptionsOfComponent,
  computedConfig: Record<string, Func>,
  initAllData: Record<string, unknown>,
  uninitedkeys: string[] = Object.keys(computedConfig),
  computedCache: ComputedCache = {},
): ComputedCache {
  for (const key of uninitedkeys) {
    const computedFunc = computedConfig[key];
    const dependences: ComputedDependence[] = [];
    // 通过代理data获取计算字段的初始值和依赖
    let initValue = computedFunc.call({ data: deepProxy(initAllData, dependences) });

    // 去除当前已初始的计算属性key
    uninitedkeys = uninitedkeys.filter(ele => ele !== key);

    // 验证依赖是否有效
    if (isValidDependences(dependences, uninitedkeys)) {
      initValue = getOriginalValue(initValue);

      // 把计算属性初始值加入到options.data中
      options.data[key] = initValue;

      // 把计算属性初始值加入到initAllData中,后续其他计算属性依赖时会可能会用到
      initAllData[key] = initValue;

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

  // uninitedkey不为空,递归
  return initComputedAndGetCache(options, computedConfig, initAllData, uninitedkeys, computedCache);
}

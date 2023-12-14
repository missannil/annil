// import type { ComponentInstance } from "../../api/RootComponent/Instance/RootComponentInstance";
// import type { IsDependOnOthers } from "./data-tracer";

import type { Func } from "hry-types/src/Misc/Func";
import type { FinalOptionsOfComponent } from "../../api/DefineComponent/collectOptionsForComponent";
import { deepProxy, unwrap } from "./data-tracer";
import type { ComputedCache, ItemCache } from "./types";
export type ComputedDependence = { paths: string[]; val: unknown };

/**
 * 如果依赖列表某项的首个字段值为undefined并且字段为其他计算属性字段 返回false(即被依赖的计算字段写在了依赖他的计算字段后面), 否则返回ComputedInfo。
 */
function isValidDependences(dependences: ComputedDependence[], computedKeys: string[]): boolean {
  for (const { paths: path, val } of dependences) {
    // 引用值为undefined时
    // console.log(path[0]);
    if ((val === undefined) && computedKeys.includes(path[0])) {
      return false;
    }
  }

  return true; // 依赖有效
}

export function getItemCache(
  initAllData: object,
  computedKeys: string[],
  computedFunc: Func,
): false | ItemCache {
  // 当前计算字段的依赖列表
  const dependences: ComputedDependence[] = [];
  const initValue = computedFunc.call({ data: deepProxy(initAllData, dependences) });

  if (isValidDependences(dependences, computedKeys)) {
    return {
      // 去重 避免 如: ` age(){ return this.data.xxx.num + this.data.xxx.str + this.data.xxx} ` 造成的多个依赖相同情况。应就要一个 xxx
      dependences: uniqueDependences(dependences),
      method: computedFunc,
      value: unwrap(initValue),
    };
  } else {
    /**
     * 情形1 依赖了其他未初始化的计算属性(不报错) 对应测试文件[NoOptionalProperties.ts](../../../jest/computed/NoOptionalProperties/NoOptionalProperties.test.ts)的copyPropUser字段
     */
    return false;
  }
}

/**
 * 依赖去重
 * @example
 * ```ts
 *  const dependences = [{path:['a','b']}, {path:['a','b','c']}, {path:['d','e']}, {path:['d']}]
 *  const result = uniqueDependences(dependences)
 *  // result = [{path:['a','b'] } ,{ path:['d'] }]
 * ```
 */
function uniqueDependences(dependences: ComputedDependence[]): ComputedDependence[] {
  if (dependences.length === 1) return dependences;
  // console.log(dependences);

  for (let f = 0; f < dependences.length; f++) {
    const firstPath = dependences[f].paths.join(".") + ".";
    for (let i = f + 1; i < dependences.length; i++) {
      const curPath = dependences[i].paths.join(".") + ".";
      // console.log(firstPath,curPath)
      if (firstPath.startsWith(curPath)) {
        // console.log("删除:", curPath, f);

        // 例如 path[0] = 'a.b.c.',curPath = 'a.b.'
        dependences.splice(f, 1);

        return uniqueDependences(dependences);
      }
      if (curPath.startsWith(firstPath)) {
        // console.log("删除:", firstPath, i);

        // 例如 curPath = 'a.b.' path[0] = 'a.b.c.',
        dependences.splice(i, 1);

        return uniqueDependences(dependences);
      }
    }
  }

  return dependences;
}

/**
 * 把计算属性初始值加入到options.data中返回缓存
 */
export function initComputed(
  options: FinalOptionsOfComponent,
  computedConfig: Record<string, Func>,
  initAllData: object,
  uninitedkeys: string[] = Object.keys(computedConfig),
  computedCache: ComputedCache = {},
): ComputedCache {
  // 收集依赖 uninitedkeys不受内部2处重新赋值的影响
  for (const key of uninitedkeys) {
    // uninitedkeys 受2处重新赋值的影响
    const itemCache = getItemCache(initAllData, uninitedkeys, computedConfig[key]);

    // 去除当前的key 2
    uninitedkeys = uninitedkeys.filter(ele => ele !== key);

    if (itemCache === false) {
      // 把当前依赖不正确的key放到后面去
      uninitedkeys.push(key);
    } else {
      /* istanbul ignore next */
      const dataOpt = options.data ||= {};

      dataOpt[key] = itemCache.value;

      initAllData[key] = itemCache.value;

      computedCache[key] = itemCache;
    }
  }
  // 看uninitedkey(2处的新值)是否未空，空表示所有依赖收集完毕直接返回
  if (uninitedkeys.length === 0) {
    return computedCache;
  }

  // uninitedkey不为空,递归
  return initComputed(options, computedConfig, initAllData, uninitedkeys, computedCache);
}

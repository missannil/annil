// import type { ComponentInstance } from "../../api/RootComponent/Instance/RootComponentInstance";
// import type { IsDependOnOthers } from "./data-tracer";

import type { Func } from "hry-types/src/Misc/Func";
import { deepProxy, unwrap } from "./data-tracer";
import type { ComputedCache, InstanceInner } from "./types";
export type ComputedDependence = { paths: string[]; val: unknown };

type ComputedInfo = {
  dependences: ComputedDependence[];
  value: unknown;
};

/**
 * 如果依赖列表某项的首个字段值为undefined并且字段为其他计算属性字段 返回false(即被依赖的计算字段写在了依赖他的计算字段后面), 否则返回ComputedInfo。
 */
function isValidDependences(dependences: ComputedDependence[], computedKeys: string[]): boolean {
  for (const { paths: path, val } of dependences) {
    // 引用值为undefined时
    // console.log(path[0]);
    if (val === undefined && computedKeys.includes(path[0])) {
      return false;
    }
  }

  return true; // 依赖有效
}

export function getComputedInfo(
  this: InstanceInner,
  computedKeys: string[],
  computedFunc: Func,
  key: string,
): false | ComputedInfo {
  // 建立当前计算字段的依赖
  const dependences: ComputedDependence[] = [];
  let initValue: unknown;
  try {
    initValue = computedFunc.call({
      data: deepProxy(this.data, dependences),
    });
  } catch (error) {
    // 为js开发考虑使用了 this.data.xxx.age 当xxx为undefined时
    if (!isValidDependences(dependences, computedKeys)) {
      // 情况2 依赖了未初始化的计算属性的子属性(会报错) 见computed测试文件
      return false;
    }
    // 其他错误正常报错
    throw error;
  }
  if (isValidDependences(dependences, computedKeys)) {
    // 有效的依赖
    initValue = unwrap(initValue);

    this.setData({
      [key]: initValue,
    });

    return { dependences, value: initValue };
  } else {
    // 情况1 依赖了其他未初始化的计算属性(不报错) 见computed测试文件
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

  for (let f = 0; f < dependences.length; f++) {
    const firstPath = dependences[f].paths.join(".") + ".";
    for (let i = f + 1; i < dependences.length; i++) {
      const curPath = dependences[i].paths.join(".") + ".";
      // console.log(firstPath,curPath)
      if (firstPath.startsWith(curPath)) {
        // console.log('删除:',f)
        // 例如 path[0] = 'a.b.c',curPath = 'a.b'
        dependences.splice(f, 1);

        return uniqueDependences(dependences);
      }
      if (curPath.startsWith(firstPath)) {
        // console.log('删除:',i)
        // 例如 curPath = 'a.b.c' path[0] = 'a.b',
        dependences.splice(i, 1);

        return uniqueDependences(dependences);
      }
    }
  }

  return dependences;
}
/**
 * 初始化计算属性配置返回计算属性缓存
 * @param computedConfig - 计算属性配置
 * @param uninitedkeys - 未初始的计算属性keys
 * @param computedCache - 计算属性缓存默认=`{}`
 * @returns 计算属性缓存
 */
export function initComputed(
  this: InstanceInner,
  computedConfig: Record<string, Func>,
  uninitedkeys: string[], //
  computedCache: ComputedCache = {},
): ComputedCache {
  // 收集依赖
  for (const key of uninitedkeys) {
    const computedInfo = getComputedInfo.call(this, uninitedkeys, computedConfig[key], key);

    // 去除完成的依赖key
    uninitedkeys = uninitedkeys.filter(ele => ele !== key);

    if (computedInfo === false) {
      // 把当前依赖不正确的key放到后面去
      uninitedkeys.push(key);
    } else {
      computedCache[key] = {
        // 去重 避免 如: ` age(){ return this.data.xxx.num + this.data.xxx.str + this.data.xxx} ` 造成的多个依赖相同情况。应就要一个 xxx
        dependences: uniqueDependences(computedInfo.dependences),
        method: computedConfig[key],
        value: computedInfo.value, // 为了watch的oldValue
      };
    }
  }
  // 看uninitedkey是否未空，空表示所有依赖收集完毕直接返回
  if (uninitedkeys.length === 0) {
    return computedCache;
  }

  // uninitedkey不为空,递归
  return initComputed.call(this, computedConfig, uninitedkeys, computedCache);
}
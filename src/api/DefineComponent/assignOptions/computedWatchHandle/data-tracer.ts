/* eslint-disable complexity */
import { deepClone } from "../../../../utils/deepClone";
import type { ComputedDependence } from "./computedUpdater";
import { uniqueDependences } from "./uniqueDependences";

export function deepProxy(
  data: object,
  dependences: ComputedDependence[],
  basePath: string[] = [],
): object {
  const handler = {
    get<T extends object>(target: T, prop: keyof T & string) {
      if (prop === "__original__") {
        return target;
      }
      const val = target[prop];

      // 如 this.data.arr.slice(),`slice`不属于自身属性不代理,不加入依赖。但不包含小程序data子字段为函数的情况)
      if (typeof val === "function" && (!Object.prototype.hasOwnProperty.call(target, prop))) {
        // val有不是函数的情况么？
        return (val as Function).bind(target);
      }

      dependences = uniqueDependences(dependences, basePath, prop);

      const curPath = basePath.concat(prop);

      dependences.push({ paths: curPath, val });

      // 非对象不代理
      if (typeof val !== "object" || val === null) return val;

      return deepProxy(val, dependences, curPath);
    },
    set(_target: object, prop: string) {
      throw Error(`${prop}字段是只读的`);
    },
  };

  return new Proxy(data, handler);
}

export function getProxyOriginalValue<T extends { __original__?: string }>(value: T): unknown {
  if (typeof value !== "object" || value === null || !value.__original__) {
    return value;
  } else {
    return deepClone(value.__original__);
  }
}

import type { ComputedDependence } from "./computedUpdater";
import { removePreviousDependence } from "./dependencesOptimize";

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

      // 自身没有但原型链上有的属性不收集依赖
      if (prop in target && !Object.prototype.hasOwnProperty.call(target, prop)) {
        return typeof val === "function" ? val.bind(target) : val;
      }
      removePreviousDependence(dependences, basePath);

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

export function getProxyOriginalValue(value: { __original__?: unknown }): unknown {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  if (value.__original__) return value.__original__;

  const ret = Array.isArray(value) ? [] : {};
  for (const key in value) {
    // @ts-ignore 隐式索引
    ret[key] = getProxyOriginalValue(value[key]);
  }

  return ret;
}

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

      // 自身没有但原型链上有的属性不收集依赖,比如数组上的方法 slice map forEach
      if (prop in target && !Object.prototype.hasOwnProperty.call(target, prop)) {
        return typeof val === "function" ? val.bind(target) : val; // : val 覆盖测试不到.
      }
      removePreviousDependence(dependences, basePath);

      const curPath = basePath.concat(prop);

      dependences.push({ paths: curPath, val });

      // 非对象不代理
      if (typeof val !== "object" || val === null) return val;
      // console.log(val, typeof val);
      return deepProxy(val, dependences, curPath);
    },
    set(_target: object, prop: string) {
      throw Error(`${prop}字段是只读的`);
    },
  };

  return new Proxy(data, handler);
}

// 如果是代理对象可以从__original__中获取原始值,否则返回自身
export function getOriginalValue(value: { __original__?: unknown }): unknown {
  if (typeof value !== "object" || value === null || value.__original__ === undefined) {
    return value;
  }

  return value.__original__;
}

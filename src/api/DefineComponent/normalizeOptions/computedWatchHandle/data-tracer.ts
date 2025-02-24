import type { ComputedDependence } from "./computedUpdater";
import { removePreviousDependence } from "./dependencesOptimize";

// 判断属性字段是否为对象自身的属性
function isOwnProp(target: object, prop: string) {
  return Object.prototype.hasOwnProperty.call(target, prop);
}
export function deepProxy(
  data: object,
  dependences: ComputedDependence[],
  basePath: string[] = [],
): object {
  let ignoreProxy = false;
  const handler = {
    get<T extends object>(target: T, prop: keyof T & string) {
      if (prop === "__original__") {
        return target;
      }
      const val = target[prop];

      // 原型链上的属性不收集依赖,比如数组上的方法 slice map forEach 对象上的toString等
      if ((val !== undefined && (isOwnProp(target, prop) === false)) || ignoreProxy) {
        return typeof val === "function" ? val.bind(target) : val; // : val 覆盖测试不到.
      }
      removePreviousDependence(dependences, basePath);

      const curPath = basePath.concat(prop);

      dependences.push({ paths: curPath, val });

      // 非对象不代理
      if (typeof val !== "object" || val === null) return val;
      return deepProxy(val, dependences, curPath);
    },
    // 使用in操作符时处理
    has(target: Record<string, unknown>, prop: string) {
      removePreviousDependence(dependences, basePath);
      const curPath = basePath.concat(prop);
      dependences.push({ paths: curPath, val: target[prop] });
      return Reflect.has(target, prop);
    },
    // 拦截Object.keys, Object.values, Object.entries时后续不收集依赖ignoreProxy=true
    ownKeys(target: object) {
      ignoreProxy = true;
      return Reflect.ownKeys(target);
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

import { deepClone } from "../../../../utils/deepClone";
import type { ComputedDependence } from "./computedUpdater";

export function deepProxy(
  data: object,
  dependences: ComputedDependence[],
  basePath: string[] = [],
): object {
  const handler = {
    get<T extends object>(target: T, prop: keyof T & string) {
      const val = target[prop];
      // 依赖长度不为0时 去重
      if (basePath.length !== 0) {
        // 依赖去重
        const lastDependences = dependences[dependences.length - 1]; // 倒数第一个是当前依赖。2022 at(-1)
        // 只留最后一个路径。比如  return this.data.obj.user.name  得到的是最后1个路径 ['obj','user','name'] 减少无效依赖,提高性能。 而非3个  ['obj'], ['obj','user'],['obj','user','name']
        if (lastDependences.paths.toString() === basePath.toString()) {
          // console.log('删除', lastDependences)
          dependences.pop();
        }
      }
      const curPath = basePath.concat(prop);

      // console.log(prop, val,'in');

      dependences.push({ paths: curPath, val: deepClone(val) });

      // 自身方法或原型属性不代理
      if (!Object.prototype.hasOwnProperty.call(target, prop) || typeof val === "function") {
        // 原型链上的属性不代理,函数加bind。如 this.data.arr.slice()  this.data.arr.forEach(...)
        return typeof val === "function" ? val.bind(target) : val;
      }
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

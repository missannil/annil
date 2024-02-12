import { deepClone } from "../../../../utils/deepClone";
import type { ComputedDependence } from "./computedUpdater";

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

      // val不为undefined(依赖还为初始化的其他计算属性)且非自身属性或函数不再返回代理。 (如 this.data.arr.slice(),slice不属于自身属性,小程序允许data子字段为函数的情况,也不代理)
      if ((val !== undefined) && (!Object.prototype.hasOwnProperty.call(target, prop) || typeof val === "function")) {
        // val有不是函数的情况么？
        return (val as Function).bind(target);
      }
      // 依赖长度不为0时径依赖去重(只留最后一个路径),比如 return this.data.obj.user.name  去重得到的是最后1个路径 ['obj','user','name'] , 不去重则3个依赖路径了 ['obj'], ['obj','user'],['obj','user','name'],在这里去重效率高些,外部去重时还要再次遍历,加"dependences[dependences.length - 1].paths.toString() === basePath.toString()"这判断是有可能遇到` this.data.obj[this.data.id].list`的情况,这种情况下,第一个依赖是obj,第二个依赖是id,因为依赖不是一个路径连续向下的,所以不能去重。
      if (basePath.length !== 0 && dependences[dependences.length - 1].paths.toString() === basePath.toString()) {
        dependences.pop();
      }
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

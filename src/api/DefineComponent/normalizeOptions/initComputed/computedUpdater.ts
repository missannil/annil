import { deepEqual } from "../../../../utils/deepEqual";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import { deepProxy, getOriginalValue } from "./data-tracer";
import { removeSubDependences } from "./dependencesOptimize";
export type ComputedDependence = { paths: string[]; val: unknown };

export function computedUpdater(this: Instance): void {
  for (const key in this.data.__computedCache__) {
    const itemCache = this.data.__computedCache__[key];
    let changed = false;
    outLook: for (const dep of itemCache.dependences) {
      let curVal: object | null = this.data;
      for (const path of dep.paths) {
        // 当前值为null时,直接跳出循环,并且认为依赖改变(说明之前的对象被赋值为null了,继续会报错)
        if (curVal === null) {
          changed = true;
          break outLook;
        }
        curVal = (curVal as Record<string, object | null>)[path];
      }
      // 检查依赖值是否改变
      if (!deepEqual(curVal, dep.val)) {
        changed = true;
        break;
      }
    }
    if (changed) {
      const newDependences: ComputedDependence[] = [];
      const newValue = itemCache.method.call({ data: deepProxy(this.data, newDependences) });
      // 更新值不会立即再次进入**函数,而是当前**函数运行完毕后触发**函数,\
      this.setData({
        [key]: getOriginalValue(newValue),
      });
      // 更新依赖(优化)
      this.data.__computedCache__[key].dependences = removeSubDependences(newDependences);
      // 有一个计算属性更新就重新更新所有计算互相,避免后置依赖导致前置依赖错误
      return computedUpdater.call(this);
    }
  }
}

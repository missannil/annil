import type { Instance } from "..";
import { deepProxy, getProxyOriginalValue } from "./data-tracer";
import { getPathsValue } from "./getPathsValue";

import { isEqual } from "./isEqual";
export type ComputedDependence = { paths: string[]; val: unknown };

export function computedUpdater(this: Instance, isUpdated = false): boolean {
  for (const key in this.data.__computedCache__) {
    const itemCache = this.data.__computedCache__[key];
    let changed = false;
    for (const dep of itemCache.dependences) {
      // getPathsValue返回的是数组
      const curVal = getPathsValue(this.data, dep.paths.join("."))[0];

      // 检查依赖是否更新
      if (!isEqual(curVal, dep.val)) {
        changed = true;

        break;
      }
    }
    if (changed) {
      const newDependences: ComputedDependence[] = [];
      let newValue = itemCache.method.call({ data: deepProxy(this.data, newDependences) });

      // 更新值不会立即再次进入**函数,而是当前**函数运行完毕后触发**函数,
      newValue = getProxyOriginalValue(newValue);

      this.setData({
        [key]: newValue,
      });

      isUpdated = true;

      // 更新依赖,去重
      this.data.__computedCache__[key].dependences = newDependences;

      // 有一个计算属性更新就重新更新所有计算互相,避免后置依赖导致前置依赖错误
      return computedUpdater.call(this, isUpdated);
    }
  }

  return isUpdated;
}

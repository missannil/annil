import { deepProxy, unwrap } from "../behaviors/BComputedAndWatch/data-tracer";
import type { ComputedDependence } from "../behaviors/BComputedAndWatch/initComputed";
import { isEqual } from "../behaviors/BComputedAndWatch/isEqual";
import type { Instance } from "../behaviors/BComputedAndWatch/types";
import { getPathsValue } from "./getPathsValue";

export function computedUpdater(this: Instance, isUpdated = false): boolean {
  // console.log("computedUpdater开始");

  // console.log("循环判断缓存中每个计算属性依赖是否有变化");

  for (const key in this.__computedCache__) {
    // console.log("当前计算属性为:", key);

    const itemCache = this.__computedCache__[key];
    let changed = false;
    for (const dep of itemCache.dependences) {
      const curVal = getPathsValue.call(this, dep.paths);

      // 检查依赖是否更新
      if (!isEqual(curVal, dep.val)) {
        changed = true;

        break;
      }
    }

    if (changed) {
      const newDependences: ComputedDependence[] = [];

      const newValue = itemCache.method.call({
        data: deepProxy(this.data, newDependences),
      });

      // 更新值不会立即再次进入**函数,而是当前**函数运行完毕后触发**函数,
      this.setData({
        [key]: unwrap(newValue),
      });

      isUpdated = true;

      // 更新依赖
      this.__computedCache__[key].dependences = newDependences;

      // 有一个计算属性更新就重新更新所有计算互相,避免后置依赖导致前置依赖错误
      return computedUpdater.call(this, isUpdated);
    }
  }

  return isUpdated;
}

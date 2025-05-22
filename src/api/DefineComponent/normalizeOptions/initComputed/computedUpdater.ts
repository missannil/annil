import { deepEqual } from "../../../../utils/deepEqual";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import { deepProxy, getOriginalValue } from "./data-tracer";
import { removeSubDependences } from "./dependencesOptimize";
import type { ComputedDependence } from "./initComputedAndGetCache";

export function computedUpdater(this: Instance): void {
  for (const key in this.data.__computedCache__) {
    const itemCache = this.data.__computedCache__[key];
    let changed = false;
    outLook: for (const dep of itemCache.dependences) {
      let curdepVal: unknown = this.data;
      for (const path of dep.paths) {
        // 如果依赖值为null,则直接跳出
        if (curdepVal === null) {
          changed = true;
          break outLook;
        }
        curdepVal = (curdepVal as Record<string, unknown>)[path];
      }
      // 检查依赖值是否改变
      if (!deepEqual(curdepVal, dep.val)) {
        changed = true;
        break;
      }
    }
    if (changed) {
      const newDependences: ComputedDependence[] = [];
      const proxyThis = new Proxy(this, {
        get(target, prop, receiver) {
          if (prop === "data") {
            return deepProxy(target.data, newDependences);
          }
          return Reflect.get(target, prop, receiver);
        },
        set() {
          throw "不可以在计算属性中修改实例的属性";
        },
      });
      const newValue = itemCache.method.call(proxyThis);
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

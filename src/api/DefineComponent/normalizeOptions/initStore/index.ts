import type mobx from "mobx";
import type { FinalOptionsOfComponent } from "..";
export function initStore(finalOptionsForComponent: FinalOptionsOfComponent) {
  const storeConfig = finalOptionsForComponent.store;
  if (storeConfig) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { toJS } = require("mobx") as typeof mobx;
    for (const key in storeConfig) {
      finalOptionsForComponent.data[key] = toJS(storeConfig[key]());

      // 把响应式数据配置保留在methods的__storeConfig__字段下带入到组件实例中(不用函数返回方式也可以,但不符合methods字段类型),后续再从原型上删除。
    }
    finalOptionsForComponent.data.__storeConfig__ = storeConfig;

    delete finalOptionsForComponent.store;
  }
}

import type mobx from "mobx";

import type { FinalOptionsOfComponent } from "../api/DefineComponent/collectOptionsForComponent";
import { deleteProtoField } from "../utils/deleteProtoField";
import type { Instance } from "./BComputedAndWatch/types";

export const BStore = Behavior({
  // @ts-ignore
  definitionFilter(options: FinalOptionsOfComponent) {
    // 初始化store
    const storeConfig = options.store;
    if (!storeConfig) return;
    const { toJS } = require("mobx") as typeof mobx;
    for (const key in storeConfig) {
      options.data[key] = toJS(storeConfig[key]());

      // 把响应式数据配置保留在methods的__storeConfig__字段下带入到组件实例中(不用函数返回方式也可以,但不符合methods字段类型),后续再从原型上删除。
      options.methods.__storeConfig__ = () => storeConfig;
    }
  },
  lifetimes: {
    created(this: Instance) {
      // 取出通过addStoreConfigToMethods函数带入的storeConfig
      const storeConfig = this.__storeConfig__?.();
      if (!storeConfig) return;
      deleteProtoField(this, "__storeConfig__");

      const { comparer, reaction, toJS } = require("mobx") as typeof mobx;

      this.disposer = {};

      for (const key in storeConfig) {
        // 添加响应式逻辑
        this.disposer[key] = reaction(
          storeConfig[key],
          (value: unknown) => {
            // 加入到待setData对象中
            this.setData({
              [key]: toJS(value),
            });
          },
          {
            equals: comparer.structural,
          },
        );
      }
    },
    /* istanbul ignore next */
    detached(this: Instance) {
      // 清除store数据 test中模拟了测试，所以忽略 框架(1.6.1)不支持 issue {@link https://github.com/wechat-miniprogram/miniprogram-simulate/issues/110}
      for (const key in this.disposer) {
        this.disposer[key]();
      }
    },
  },
});

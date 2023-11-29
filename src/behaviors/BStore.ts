import type mobx from "mobx";
import type { FinalOptionsForComponent } from "../api/DefineComponent";
import { deleteProtoField } from "../utils/deleteProtoField";
import type { Instance } from "./BComputedAndWatch/types";

export const BStore = Behavior({
  definitionFilter(options: FinalOptionsForComponent) {
    // 初始化store
    const storeConfig = options.store;
    if (!storeConfig) return;
    const { toJS } = require("mobx") as typeof mobx;
    for (const key in storeConfig) {
      options.data ||= {};

      options.data[key] = toJS(storeConfig[key]());

      // 把响应式数据配置保留在methods的__storeConfig__字段下带入到组件实例中(不用函数返回方式也可以,但不符合methods字段类型),后续再从原型上删除。
      /* istanbul ignore next */
      options.methods ||= {};

      options.methods.__storeConfig__ = () => storeConfig;

      delete options.store;
    }
  },

  lifetimes: {
    created(this: Instance) {
      // 取出通过addStoreConfigToMethods函数带入的storeConfig
      const storeConfig = this.__storeConfig__?.();
      if (!storeConfig) return;
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
      deleteProtoField(this, "__storeConfig__");
    },
    detached(this: Instance) {
      // 清除store数据 test中模拟了测试，所以忽略 框架不支持 issue {@link https://github.com/wechat-miniprogram/miniprogram-simulate/issues/110}
      /* istanbul ignore next */
      for (const key in this.disposer) {
        this.disposer[key]();
      }
    },
  },
});

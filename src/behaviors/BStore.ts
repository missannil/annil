import type mobx from "mobx";
import type { Instance } from "../api/RootComponent/Instance/RootComponentInstance";

/**
 * 在created生命周期中,初始化 store数据(__storeConfig__)到data中
 * 在detached生命周期中,清除store数据
 */
export const BStore = Behavior({
  lifetimes: {
    created(this: Instance) {
      const storeConfig = this.data.__storeConfig__;
      if (!storeConfig) return;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { comparer, reaction, toJS } = require("mobx") as typeof mobx;
      // 存储reaction的disposer 需要冲突字段验证
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
      delete this.data.__storeConfig__;
    },

    detached(this: Instance) {
      /* istanbul ignore next 清除store数据 test中模拟了测试，所以忽略 框架(1.6.1)不支持 issue {@link https://github.com/wechat-miniprogram/miniprogram-simulate/issues/110}*/
      for (const key in this.disposer) {
        this.disposer[key]();
      }
    },
  },
});

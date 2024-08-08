import type mobx from "mobx";
import type { Instance } from "../api/RootComponent/Instance/RootComponentInstance";
import { deepEqual } from "../utils/deepEqual";
import { isEmptyObject } from "../utils/isEmptyObject";

function reactionRegister(this: Instance, storeConfig: Record<string, () => unknown>) {
  const unequalData: Record<string, unknown> = {};
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { comparer, reaction, toJS } = require("mobx") as typeof mobx;
  // 存储reaction的disposer 需要保护内部字段验证
  this.disposer = {};
  for (const key in storeConfig) {
    const currentStoreValue = toJS(storeConfig[key]());
    // @ts-ignore this.data[key]一定存在
    if (!deepEqual(currentStoreValue, this.data[key])) {
      unequalData[key] = currentStoreValue;
    }
    // 添加响应式逻辑
    this.disposer[key] = reaction(
      storeConfig[key],
      (value: unknown) => {
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
  if (!isEmptyObject(unequalData)) this.setData(unequalData);
}

/**
 * 在attached(1.7.5之前在created中)生命周期中,建立store数据的reaction
 * 在detached生命周期中,清除store数据
 */
export const BStore = Behavior({
  lifetimes: {
    attached(this: Instance) {
      // 此时store数据已初始化到data中(initStore)
      const storeConfig = this.data.__storeConfig__;
      if (!storeConfig) return;

      reactionRegister.call(this, storeConfig);
    },
    detached(this: Instance) {
      /* istanbul ignore next 清除store数据 test中模拟了测试，所以忽略 框架(1.6.1)不支持 issue {@link https://github.com/wechat-miniprogram/miniprogram-simulate/issues/110}*/
      for (const key in this.disposer) {
        this.disposer[key]();
      }
    },
  },
});

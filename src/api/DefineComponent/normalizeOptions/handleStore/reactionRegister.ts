import type mobx from "mobx";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { StoreConstraint } from "../../../RootComponent/Store/StoreConstraint";
export function reactionRegister(this: Instance, storeConfig: StoreConstraint) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { comparer, reaction, toJS } = require("mobx") as typeof mobx;
  // 存储reaction的disposer 需要保护内部字段验证
  this.disposer = {};
  const peddingSetData: Record<string, unknown> = {};
  for (const key in storeConfig) {
    const getter = storeConfig[key];
    const value = getter(this.data);
    if (value === undefined) {
      throw new Error(`store配置中 ${key} 字段的返回值不可为undefined`);
    }
    // 添加响应式逻辑
    peddingSetData[key] = toJS(value);
    this.disposer[key] = reaction(
      () => getter(this.data),
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
  this.setData(peddingSetData);
}

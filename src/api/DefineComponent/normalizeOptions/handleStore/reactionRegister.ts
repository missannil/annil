import type mobx from "mobx";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
export function reactionRegister(this: Instance, storeConfig: Record<string, () => unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { comparer, reaction, toJS } = require("mobx") as typeof mobx;
  // 存储reaction的disposer 需要保护内部字段验证
  this.disposer = {};
  const peddingSetData: Record<string, unknown> = {};
  for (const key in storeConfig) {
    // 添加响应式逻辑
    peddingSetData[key] = toJS(storeConfig[key]());
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

  this.setData(peddingSetData);
}

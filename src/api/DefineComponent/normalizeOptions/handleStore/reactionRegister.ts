import type mobx from "mobx";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { Getter, StoreConstraint, WithDefault } from "../../../RootComponent/Store/StoreConstraint";
function isGetter(value: Getter | WithDefault): value is Getter {
  return typeof value === "function";
}
export function reactionRegister(this: Instance, storeConfig: StoreConstraint) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { comparer, reaction, toJS } = require("mobx") as typeof mobx;
  // 存储reaction的disposer 需要保护内部字段验证
  this.disposer = {};
  const peddingSetData: Record<string, unknown> = {};
  for (const key in storeConfig) {
    let value;
    let getter;
    const itemConfig = storeConfig[key];
    if (isGetter(itemConfig)) {
      value = itemConfig(this.data);
      if (value === undefined) {
        throw new Error(`store配置中 ${key} 字段的 函数值不可为undefined`);
      }
      getter = itemConfig;
    } else {
      if (itemConfig.getter(this.data) !== undefined) {
        throw new Error(`store配置中  ${key}字段的配置对象中getter函数值不为undefined`);
      }
      getter = itemConfig.getter;
      value = itemConfig.default;
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

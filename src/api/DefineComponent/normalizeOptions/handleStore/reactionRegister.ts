import type mobx from "mobx";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { StoreConstraint } from "../../../RootComponent/Store/StoreConstraint";

/**
 * 为store字段注册reaction,以实现响应式更新。
 * 注意:如果getter函数返回undefined,则不会注册reaction,该字段将不可响应式,但不报错(有警告)。如果getter函数没有依赖任何响应式数据,则不会注册reaction,该字段将不可响应式,并抛出错误。
 * @param this
 * @param storeConfig
 */
export function reactionRegister(this: Instance, storeConfig: StoreConstraint) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { comparer, getDependencyTree, reaction, toJS } = require("mobx") as typeof mobx;
  // 1. 清理旧的reaction,避免重复注册(组件detached),虽然在detached时加入了清理reaction的逻辑,但在某些极端情况下可能无法触发(如组件未调用detached周期,就又运行了attached周期),因此在这里先清理一次,确保不会重复注册。
  if (this.disposer) {
    for (const key of Object.keys(this.disposer)) {
      this.disposer[key]();
    }
  }
  this.disposer = {};
  const pendingSetData: Record<string, unknown> = {};

  for (const key of Object.keys(storeConfig)) {
    const getter = storeConfig[key];

    // 1. 临时 reaction：只用来检测依赖
    let hasObservableDependency = false;
    let firstRunValue: unknown;

    const tempDisposer = reaction(
      () => {
        const value = getter(this.data);
        firstRunValue = value; // 顺便获取初始值
        return value;
      },
      () => void 0, // 空回调，零副作用
      { fireImmediately: true },
    );

    // 2. 检查依赖
    const deps = getDependencyTree(tempDisposer).dependencies ?? [];
    hasObservableDependency = deps.length > 0;
    // 3. 清理临时 reaction
    tempDisposer();

    // 4. 验证
    if (firstRunValue === undefined) {
      console.warn(`store字段 ${key} 的getter函数返回了undefined，该字段将不会被注册为响应式字段。`);
      continue;
    }

    if (!hasObservableDependency) {
      throw new Error(`store字段 ${key} 的getter函数没有依赖任何响应式数据。`);
    }

    // 5. 正式绑定
    const disposer = reaction(
      () => getter(this.data),
      (value: unknown) => {
        this.setData({ [key]: toJS(value) });
      },
      { equals: comparer.structural },
    );

    pendingSetData[key] = toJS(firstRunValue);
    this.disposer[key] = disposer;
  }

  this.setData(pendingSetData);
}

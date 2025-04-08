import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";

export function disposeStore(this: Instance) {
  const { disposer } = this;
  for (const key in disposer) {
    disposer[key]();
  }
  // 清除disposer
  this.disposer = {};
}

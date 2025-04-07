import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from "..";
import { initComputedAndGetCache } from "./initComputedAndGetCache";

export function handleComputed(
  this: Instance,
  computedConfig: FinalOptionsOfComponent["computed"],
) {
  // 计算属性初始化和首次依赖收集

  const __computedInitCache__ = initComputedAndGetCache.call(this, computedConfig);

  // 缓存放入data中
  this.data.__computedCache__ = __computedInitCache__;
}

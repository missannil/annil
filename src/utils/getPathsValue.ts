import type { Instance } from "../behaviors/BComputedAndWatch/types";

export function getPathsValue(this: Instance, paths: string[]) {
  return paths.reduce((pre: any, path) => {
    // pre有可能为undefined|null,比如paths(['computedUser','name'])的首路径为还未初始化的计算属性(undefined),还有可能是properties的对象类型(默认为null)
    try {
      return pre[path];
    } catch (error) {
      return undefined;
    }
  }, this.data);
}

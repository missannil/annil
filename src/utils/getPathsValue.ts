import type { Instance } from "../behaviors/BComputedAndWatch/types";

export function getPathsValue(this: Instance, paths: string[]) {
  return paths.reduce((pre: unknown, path) => {
    // pre有可能为undefined,比如paths(['computedUser','name'])的首路径为还未初始化的计算属性,还有可能是properties的对象类型(默认为null)
    return pre ? pre[path] : pre;
  }, this.data);
}

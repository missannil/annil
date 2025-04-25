import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";

export function addDetachedData(this: Instance) {
  // 如果 attached字段被占用,就不添加了
  if (this.data.attached !== undefined) return;
  // this.data.__notUpdateComputed__ = true;
  this.setData({
    // @ts-ignore
    attached: true,
  });
  // this.data.__notUpdateComputed__ = false;
}

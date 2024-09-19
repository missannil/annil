import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";

export function pagePathCheck(path?: string) {
  return function(this: Instance) {
    if (path && `/${this.is}` !== path) {
      throw new Error(`页面路径错误,应为 /${this.is}`);
    }
  };
}

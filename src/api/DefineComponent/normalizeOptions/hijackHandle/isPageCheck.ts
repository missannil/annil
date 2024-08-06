import type { Instance, PageInstance } from "../../../RootComponent/Instance/RootComponentInstance";

/**
 * 劫持attached,根据this.route做判断 isPage值是否正确
 */
export function isPageCheck(isPage: boolean | undefined) {
  return function(this: Instance) {
    const route = (this as PageInstance).route as string | undefined;
    if (route && isPage !== true) {
      // 页面isPage值错误
      throw Error(
        `页面 /${route} 中, RootComponent构建页面时,isPage字段值应为 true`,
      );
    }
    if (!route && isPage !== false && isPage !== undefined) {
      // 组件写了isPage = true
      throw Error(
        `组件 ${this.is} 中  RootComponent构建组件时,可不写isPage字段或值为 false`,
      );
    }
  };
}

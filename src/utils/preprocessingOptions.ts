import type { CompOptions, FinalOptions, PageOptions } from "../api/DefineComponent";
import type { SubComponentOptions } from "../api/SubComponent";

export function rootComponentHandle(finalOptions: FinalOptions, options: PageOptions | CompOptions) {
  if (options.rootComponent) {
    Object.assign(finalOptions, options.rootComponent);
  }
}

export function subComponentsHandle(finalOptions: FinalOptions, options: PageOptions | CompOptions) {
  options.subComponents && (options.subComponents as SubComponentOptions[]).forEach((subOption) => {
    // 每一个子项配置并入finalOptions
    Object.assign(finalOptions.data, subOption.data);

    Object.assign(finalOptions.computed, subOption.computed);

    Object.assign(finalOptions.event, subOption.event);

    Object.assign(finalOptions.methods, subOption.methods);

    Object.assign(finalOptions.watch, subOption.watch);

    Object.assign(finalOptions.lifetimes, subOption.lifetimes);

    Object.assign(finalOptions.pageLifetimes, subOption.pageLifetimes);
  });
}

/**
 * 配置字段整合
 */
export function configIntegration(finalOptions: FinalOptions, options: unknown, funcList: AnyFunction[]) {
  funcList.forEach((ele) => ele(finalOptions, options));
}

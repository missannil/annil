import type { Func } from "hry-types/src/Misc/Func";
import type { ComponentOptions, FuncConfig } from "../api/DefineComponent";
import type { RootComponentDoc } from "../api/RootComponent/RootComponentDoc";

/**
 * 把配置为函数的字段方法收集到funcConfig中
 */
export function funcFieldsCollect(
  config: Record<string, Func>,
  funcConfig: FuncConfig,
  type: "pageLifetimes" | "lifetimes" | "watch",
) {
  for (const key in config) {
    const handler = config[key];
    // 收集声明周期函数
    const tempCache: object = funcConfig[type] ||= {};
    const filedList: Func[] = tempCache[key] ||= [];

    filedList.push(handler);
  }
}

// 其他字段加入到componentOptions对应字段配置中
export function otherFieldsHandle(
  componentOptions: ComponentOptions,
  rootComponentOptions: Omit<RootComponentDoc, "customEvents" | "events" | "pageLifetimes">,
) {
  for (const key in rootComponentOptions) {
    const config = rootComponentOptions[key];
    // 好像只有behaviors是数组吧?.

    if (Array.isArray(config)) {
      /* istanbul ignore next */
      componentOptions[key] ||= [];

      componentOptions[key].push(...config);
    } else {
      Object.assign(componentOptions[key] ||= {}, config);
    }
  }
}

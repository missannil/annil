import type { RootComponentTrueOptions } from "../../RootComponent";
import type { FinalOptionsOfComponent } from ".";

/**
 * 其他字段加入到componentOptions对应字段配置中
 */
export function otherFieldsHandle(
  finalOptions: FinalOptionsOfComponent,
  rootComponentOptions: Omit<RootComponentTrueOptions, "customEvents" | "events">,
) {
  let key: keyof Omit<RootComponentTrueOptions, "customEvents" | "events">;
  for (key in rootComponentOptions) {
    const config = rootComponentOptions[key];
    if (config === undefined) continue;
    if (key === "behaviors") {
      finalOptions[key].push(...config as string[]);
    } else if (typeof config === "object") {
      // @ts-ignore
      finalOptions[key] = finalOptions[key] || {};
      // @ts-ignore
      Object.assign(finalOptions[key], config);
    } else if (typeof config === "boolean") {
      finalOptions[key as "isPage"] = config;
    } else {
      // console.warn(`选项的${key}字段,无特殊处理`);
      finalOptions[key] = config;
    }
  }
}

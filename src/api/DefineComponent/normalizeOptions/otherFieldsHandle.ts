import type { RootComponentTrueOptions } from "../../RootComponent";
import type { FinalOptionsOfComponent } from ".";

/**
 * 其他字段加入到componentOptions对应字段配置中
 */
export function otherFieldsHandle(
  finalOptions: FinalOptionsOfComponent,
  rootComponentOptions: RootComponentTrueOptions,
) {
  for (const key in rootComponentOptions) {
    // @ts-ignore 隐式索引
    const config = rootComponentOptions[key];
    if (Array.isArray(config) === true) {
      //  "behaviors" || "externalClasses"是数组
      // @ts-ignore 只有 behaviors 和 externalClasses, 且都默认为[]
      finalOptions[key].push(...config);
    } else if (typeof config === "object") {
      // @ts-ignore 隐式索引
      Object.assign(finalOptions[key] ||= {}, config);
    } else {
      // 函数字段有 根组件有 `export` 子组件无此字段
      // @ts-ignore 隐式索引
      finalOptions[key] = config;
    }
  }
}

import type { CustomComponentTrueOptions } from "../../CustomComponent";
import type { RootComponentTrueOptions } from "../../RootComponent";
import type { SameFuncOptions } from ".";

/**
 * 把配置为函数的字段方法收集到funcOptions中
 */
export function sameFuncFieldsCollect(
  options: CustomComponentTrueOptions | RootComponentTrueOptions,
  funcOptions: SameFuncOptions,
) {
  let key: keyof SameFuncOptions;
  for (key in funcOptions) {
    const optionsKeyConfig = options[key];
    if (optionsKeyConfig) {
      for (const _key in optionsKeyConfig) {
        // @ts-ignore
        (funcOptions[key][_key] ||= []).push(optionsKeyConfig[_key]);
      }
    }
  }
}

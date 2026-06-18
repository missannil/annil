import type { Func } from "hry-types/src/Misc/Func";

import type { RootComponentDefinitionRuntime } from "../../RootComponent/returnType";
import type { SubComponentDefinitionRuntime } from "../../SubComponent/returnType";
import type { SameFuncOptions } from ".";

/**
 * 把配置为函数的字段方法收集到funcOptions中
 */
export function sameFuncFieldsCollect(
  options: SubComponentDefinitionRuntime | RootComponentDefinitionRuntime,
  funcOptions: SameFuncOptions,
) {
  let key: keyof SameFuncOptions;
  for (key in funcOptions) {
    const optionsKeyConfig: Record<string, Func> | undefined = options[key];
    if (optionsKeyConfig) {
      for (const _key in optionsKeyConfig) {
        (funcOptions[key][_key] ||= []).push(optionsKeyConfig[_key]);
      }
    }
  }
}

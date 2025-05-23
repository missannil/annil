import type { SlotComponentReturnType } from "../../ChunkComponent/SlotComponentReturnType";
import type { CustomComponentTrueOptions } from "../../CustomComponent";
import type { RootComponentTrueOptions } from "../../RootComponent";

export function __throttleDebounce__FieldCheck(
  config: RootComponentTrueOptions | CustomComponentTrueOptions[] | SlotComponentReturnType[],
) {
  if (Array.isArray(config)) {
    for (const subComponent of config) {
      __throttleDebounce__FieldCheck(subComponent);
    }
  } else {
    const dataKeys: string[] = [];
    if (config.data) {
      dataKeys.push(...Object.keys(config.data));
    }
    if (config.computed) {
      dataKeys.push(...Object.keys(config.computed));
    }
    if (config.properties) {
      dataKeys.push(...Object.keys(config.properties));
    }
    if (config.store) {
      dataKeys.push(...Object.keys(config.store));
    }
    if (dataKeys.includes("__throttleDebounce__")) {
      throw Error(`__throttleDebounce__字段已被内部字段占用`);
    }
  }
}

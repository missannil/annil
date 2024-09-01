import type { RootComponentTrueOptions } from "../../RootComponent";
import type { FinalOptionsOfComponent, SameFuncOptions } from ".";
import { customEventsHandle } from "./customEventsHandle";
import { otherFieldsHandle } from "./otherFieldsHandle";
import { sameFuncFieldsCollect } from "./sameFuncFieldsCollect";

/**
 * 收集 rootComponentOptions 配置到 finalOptions 和 funcOptions 中
 * @param finalOptions - 收集配置对象
 * @param funcOptions  - 收集特殊配置对象字段
 * @param rootComponentOptions - 被收集的源配置对象
 */
export function rootComponentOptionHandle(
  finalOptions: FinalOptionsOfComponent,
  funcOptions: SameFuncOptions,
  rootComponentOptions: RootComponentTrueOptions,
) {
  // 自定义事件处理时,如果配置了防抖节流,则需要在data.__throttleDebounce__保留配置信息,以便后续使用
  if (rootComponentOptions.customEvents) customEventsHandle(finalOptions, rootComponentOptions.customEvents);

  if (rootComponentOptions.events) Object.assign(finalOptions.methods, rootComponentOptions.events);

  sameFuncFieldsCollect(rootComponentOptions, funcOptions);

  otherFieldsHandle(finalOptions, rootComponentOptions);
}

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
  if (rootComponentOptions.customEvents) customEventsHandle(finalOptions.methods, rootComponentOptions.customEvents);

  if (rootComponentOptions.events) Object.assign(finalOptions.methods, rootComponentOptions.events);

  sameFuncFieldsCollect(rootComponentOptions, funcOptions);

  otherFieldsHandle(finalOptions, rootComponentOptions);
}

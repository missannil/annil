import { isEmptyObject } from "../../../utils/isEmptyObject";
import type { RootComponentTrueOptions } from "../../RootComponent";
import type { FinalOptionsOfComponent, SameFuncOptions } from ".";
import { __throttleDebounce__FieldCheck } from "./__throttleDebounce__FieldCheck";
import { customEventsHandle } from "./customEventsHandle";
import { otherFieldsHandle } from "./otherFieldsHandle";
import { sameFuncFieldsCollect } from "./sameFuncFieldsCollect";

/**
 * 收集 rootComponentOptions 配置到 finalOptions 和 funcOptions 中
 * @param finalOptions - 收集配置对象`
 * @param rootComponent - 被收集的源配置对象
 * @param funcOptions  - 收集特殊配置对象字段
 */
export function handleRootComponent(
  finalOptions: FinalOptionsOfComponent,
  rootComponent: RootComponentTrueOptions | undefined,
  funcOptions: SameFuncOptions,
) {
  if (rootComponent && !isEmptyObject(rootComponent)) {
    // 验证配置中是否有内部字段__throttleDebounce__,有则报错,因为在rootComponentOptionHandle中会加入__throttleDebounce__字段到data中
    __throttleDebounce__FieldCheck(rootComponent);
    // 自定义事件处理时,如果配置了防抖节流,则需要在data.__throttleDebounce__保留配置信息,以便后续使用
    if (rootComponent.customEvents) customEventsHandle(finalOptions, rootComponent.customEvents);
    delete rootComponent.customEvents;
    if (rootComponent.events) Object.assign(finalOptions.methods, rootComponent.events);
    delete rootComponent.events;
    sameFuncFieldsCollect(rootComponent, funcOptions);

    otherFieldsHandle(finalOptions, rootComponent);
  }
}

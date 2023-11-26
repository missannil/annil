import type { ComponentOptions } from "../api/DefineComponent";
import type { FullCustomEvents, ShortCustomeEvents } from "../api/RootComponent/CustomEvents/CustomEventConstraint";
import type { Instance } from "../behaviors/BComputedAndWatch/types";
// 类型守卫
function IsFullCustomEvents(
  customEventOptions: FullCustomEvents | ShortCustomeEvents,
): customEventOptions is FullCustomEvents {
  return Object.prototype.toString.call(customEventOptions) === "[object Object]";
}

/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
export function customEventsHandle(componentOptions: ComponentOptions, customEventsConfig: object) {
  /* istanbul ignore next */
  componentOptions.methods ||= {};

  for (const key in customEventsConfig) {
    const customEventOptions = customEventsConfig[key];

    if (IsFullCustomEvents(customEventOptions)) {
      componentOptions.methods[key] = function(detail: unknown) {
        (this as unknown as Instance).triggerEvent(key, detail, customEventOptions.options);
      };
    } else {
      componentOptions.methods[key] = function(detail: unknown) {
        (this as unknown as Instance).triggerEvent(key, detail);
      };
    }
  }
}

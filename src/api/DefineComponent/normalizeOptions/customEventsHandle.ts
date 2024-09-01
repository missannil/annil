import type {
  CustomEventConstraint,
  CustomEvents,
  FullCustomEvents,
} from "../../RootComponent/CustomEvents/CustomEventConstraint";
import type { Instance } from "../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent, ThrottleDebounce } from ".";
function getThrottleDebounceConfig(
  methodsName: string,
  customEventOptions: FullCustomEvents,
  __throttleDebounce__: ThrottleDebounce,
) {
  const { debounce, throttle } = customEventOptions;

  if (debounce) {
    __throttleDebounce__.debounce ||= {};
    __throttleDebounce__.debounce[methodsName] = debounce;
  } else if (throttle) {
    __throttleDebounce__.throttle ||= {};
    __throttleDebounce__.throttle[methodsName] = throttle;
  }
}

// 类型守卫
function IsFullCustomEvents(
  customEventOptions: CustomEvents,
): customEventOptions is FullCustomEvents {
  return Object.prototype.toString.call(customEventOptions) === "[object Object]";
}
/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
export function customEventsHandle(
  finalOptions: FinalOptionsOfComponent,
  customEventsConfig: CustomEventConstraint,
) {
  const methods = finalOptions.methods;
  const data = finalOptions.data;
  for (const key in customEventsConfig) {
    const customEventOptions = customEventsConfig[key];
    if (IsFullCustomEvents(customEventOptions)) {
      methods[key] = function(this: Instance, detail: unknown) {
        this.triggerEvent(key, detail, customEventOptions.options);
      };
      data.__throttleDebounce__ ||= {};
      // 全配置允许设置防抖和节流,在这里保留配置到data.__throttleDebounce__中,以便后续使用
      getThrottleDebounceConfig(key, customEventOptions, data.__throttleDebounce__);
    } else {
      methods[key] = function(this: Instance, detail: unknown) {
        this.triggerEvent(key, detail);
      };
    }
  }
}

import type {
  CustomEventConstraint,
  CustomEvents,
  FullCustomEvents,
} from "../../RootComponent/CustomEvents/CustomEventConstraint";
import type { Instance } from "../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from ".";
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
  methods: FinalOptionsOfComponent["methods"],
  customEventsConfig: CustomEventConstraint,
) {
  for (const key in customEventsConfig) {
    const customEventOptions = customEventsConfig[key];

    if (IsFullCustomEvents(customEventOptions)) {
      methods[key] = function(this: Instance, detail: unknown) {
        this.triggerEvent(key, detail, customEventOptions.options);
      };
    } else {
      methods[key] = function(this: Instance, detail: unknown) {
        this.triggerEvent(key, detail);
      };
    }
  }
}

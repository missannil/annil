import type { ComponentOptions } from "../api/DefineComponent";

/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
export function eventsHandle(componentOptions: ComponentOptions, eventsConfig: object) {
  componentOptions.methods ||= {};

  Object.assign(componentOptions.methods, eventsConfig);
}

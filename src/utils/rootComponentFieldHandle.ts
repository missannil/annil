import type { ComponentOptions, FuncConfig } from "../api/DefineComponent";
import type { RootComponentDoc } from "../api/RootComponent/RootComponentDoc";
import { funcFieldsCollect, otherFieldsHandle } from "./collector";

import { customEventsHandle } from "./customEventsHandle";
import { eventsHandle } from "./eventsHandle";

export function rootComponentFieldHandle(
  rootComponentConfig: RootComponentDoc,
  componentOptions: ComponentOptions,
  funcConfig: FuncConfig,
) {
  rootComponentConfig.customEvents && customEventsHandle(componentOptions, rootComponentConfig.customEvents);

  rootComponentConfig.events && eventsHandle(componentOptions, rootComponentConfig.events);

  // 框架不支持测试页面
  /* istanbul ignore next */
  rootComponentConfig.pageLifetimes
    && funcFieldsCollect(rootComponentConfig.pageLifetimes, funcConfig, "pageLifetimes");

  rootComponentConfig.lifetimes && funcFieldsCollect(rootComponentConfig.lifetimes, funcConfig, "lifetimes");

  rootComponentConfig.watch && funcFieldsCollect(rootComponentConfig.watch, funcConfig, "watch");

  otherFieldsHandle(componentOptions, rootComponentConfig);
}

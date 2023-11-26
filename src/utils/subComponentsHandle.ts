import type { ComponentOptions, FuncConfig } from "../api/DefineComponent";
import type { SubComponentOptions } from "../api/SubComponent";
import { funcFieldsCollect, otherFieldsHandle } from "./collector";

import { eventsHandle } from "./eventsHandle";

export function subComponentsHandle(
  componentOptions: ComponentOptions,
  subComponents: SubComponentOptions[],
  funcConfig: FuncConfig,
) {
  subComponents.forEach((subOption) => {
    subOption.events && eventsHandle(componentOptions, subOption.events);

    // 框架不支持测试页面
    /* istanbul ignore next */
    subOption.pageLifetimes && funcFieldsCollect(subOption.pageLifetimes, funcConfig, "pageLifetimes");

    subOption.lifetimes && funcFieldsCollect(subOption.lifetimes, funcConfig, "lifetimes");

    subOption.watch && funcFieldsCollect(subOption.watch, funcConfig, "watch");

    otherFieldsHandle(componentOptions, subOption);
  });
}

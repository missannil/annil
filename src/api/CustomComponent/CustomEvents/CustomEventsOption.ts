import type { G } from "hry-types";

export type CustomEventsOption<
  TCustomEvents extends object,
  CustomEventsDoc extends object,
  legalKeys extends PropertyKey,
  DuplicateKeys extends PropertyKey,
> = {
  /**
   * 子组件事件(基础事件|自定义事件)
   * 可使用内部泛型(Detail、Mark、WMBaseEvent、WMCustomEvent、CurrentTargetDataset、TargetDataset)自定义事件类型
   * 非法字段检测(除了组件事件的key均属于非法字段)
   */
  events?:
    & TCustomEvents
    & G.IllegalFieldValidator<CustomEventsDoc, legalKeys>
    & G.DuplicateFieldValidator<TCustomEvents, DuplicateKeys>;
};

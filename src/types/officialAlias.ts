export type WMTriggerEventOption = WechatMiniprogram.Component.TriggerEventOption;
export type WMCustomEvent<
  Detail = object,
  Mark extends object = object,
  CurrentTargetDataset extends object = object,
  TargetDataset extends object = CurrentTargetDataset,
> = WechatMiniprogram.CustomEvent<
  Detail,
  Mark,
  CurrentTargetDataset,
  TargetDataset
>;
export type WMBaseEvent<
  Mark extends object = object,
  CurrentTargetDataset extends object = object,
  TargetDataset extends object = CurrentTargetDataset,
> = WechatMiniprogram.BaseEvent<Mark, CurrentTargetDataset, TargetDataset>;
/**
 * 事件Dataset类型
 */
export type Dataset<T extends object> = WMBaseEvent<object, T>;
/**
 * 自定义事件Detail类型
 */
export type Detail<T> = WMCustomEvent<T>;

export type WMNavigateToSuccessCallbackResult = WechatMiniprogram.NavigateToSuccessCallbackResult;

export type WMPageLifetimes = WechatMiniprogram.Component.PageLifetimes;

export type WMInstanceProperties = WechatMiniprogram.Component.InstanceProperties;

export type WMInstanceMethods<T extends object> = WechatMiniprogram.Component.InstanceMethods<T>;

export type WMCompLifetimes = WechatMiniprogram.Component.Lifetimes;

export type WMCompOtherOption = WechatMiniprogram.Component.OtherOption;

export type WMPageLifetime = WechatMiniprogram.Page.ILifetime;

export type WMComponentOption = WechatMiniprogram.Component.ComponentOptions;

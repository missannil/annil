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
 * 事件触发组件的Dataset类型
 */
export type Dataset<
  TCurrentTargetDataset extends object,
  TargetDataset extends object = TCurrentTargetDataset,
  Detail = {},
> = WMCustomEvent<Detail, object, TCurrentTargetDataset, TargetDataset>;

/**
 * 自定义事件Detail类型
 */
export type Mark<TMark extends object> = WechatMiniprogram.CustomEvent<
  {},
  TMark,
  {},
  {}
>;

/**
 * 自定义事件Detail类型
 */
export type Detail<T> = WMCustomEvent<T>;

/**
 * 当前事件组件Dataset
 */
export type CurrentTargetDataset<T extends object> = WMCustomEvent<{}, {}, T>;

/**
 * 触发事件组件Dataset
 */
export type TargetDataset<TargetDataset extends object> = WMCustomEvent<{}, {}, {}, TargetDataset>;

export type WMTrivialOption<
  TData extends WechatMiniprogram.Component.DataOption,
  TProperty extends WechatMiniprogram.Component.PropertyOption,
  TMethod extends WechatMiniprogram.Component.MethodOption,
  TCustomInstanceProperty extends WechatMiniprogram.IAnyObject = {},
  TIsPage extends boolean = false,
> = WechatMiniprogram.Component.Options<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>;

export type WMNavigateToSuccessCallbackResult = WechatMiniprogram.NavigateToSuccessCallbackResult;

export type WMCompPageLifetimes = WechatMiniprogram.Component.PageLifetimes;

export type WMInstanceProperties = WechatMiniprogram.Component.InstanceProperties;

export type WMInstanceMethods<T extends object> = WechatMiniprogram.Component.InstanceMethods<T>;

export type WMCompLifetimes = WechatMiniprogram.Component.Lifetimes;

export type WMCompOtherOption = WechatMiniprogram.Component.OtherOption;

export type WMPageLifetimes = WechatMiniprogram.Page.ILifetime;

export type WMComponentOption = WechatMiniprogram.Component.ComponentOptions;

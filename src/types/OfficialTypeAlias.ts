export type WMTriggerEventOption = WechatMiniprogram.Component.TriggerEventOption;

export type WMCustomEvent<
  Detail = object,
  Mark extends object = object,
  CurrentTargetDataset extends object = object,
  TargetDataset extends object = CurrentTargetDataset,
> = WechatMiniprogram.CustomEvent<
  // @ts-ignore
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

// export type WMTrivialOption<
//   TData extends WechatMiniprogram.Component.DataOption,
//   TProperty extends WechatMiniprogram.Component.PropertyOption,
//   TMethod extends WechatMiniprogram.Component.MethodOption,
//   TCustomInstanceProperty extends WechatMiniprogram.IAnyObject = {},
//   TIsPage extends boolean = false,
export type WMComponentOption = WechatMiniprogram.Component.TrivialOption;

export type WMNavigateToSuccessCallbackResult = WechatMiniprogram.NavigateToSuccessCallbackResult;

export type WMCompPageLifetimes = WechatMiniprogram.Component.PageLifetimes;

export type WMComponentInstance = WechatMiniprogram.Component.InstanceProperties;

export type WMPageInstance = WechatMiniprogram.Page.InstanceProperties;

export type WMNavigateToOption = WechatMiniprogram.NavigateToOption;

export type WMInstanceMethods<T extends object> = WechatMiniprogram.Component.InstanceMethods<T>;

export type WMCompLifetimes = WechatMiniprogram.Component.Lifetimes;

export type WMCompOtherOption = WechatMiniprogram.Component.OtherOption;

export type WMPageLifetimes = WechatMiniprogram.Page.ILifetime;

export declare namespace WMComponent {
  interface Options {
    /**
     * [启用多slot支持](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件wxml的slot)
     */
    multipleSlots?: boolean;
    /**
     * 原始文档 [组件样式隔离](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件样式隔离)
     * @deprecated glass-easel框架下被废弃  [兼容文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/glass-easel/migration.html#JSON-%E9%85%8D%E7%BD%AE)
     */
    addGlobalClass?: boolean;
    /**
     * [组件样式隔离](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件样式隔离)
     */
    styleIsolation?:
      | "isolated"
      | "apply-shared"
      | "shared"
      | "page-isolated"
      | "page-apply-shared"
      | "page-shared";
    /**
     * [纯数据字段](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/pure-data.html) 是一些不用于界面渲染的 data 字段，可以用于提升页面更新性能。从小程序基础库版本 2.8.2 开始支持。
     */
    pureDataPattern?: RegExp;
    /**
     * [虚拟化组件节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E8%99%9A%E6%8B%9F%E5%8C%96%E7%BB%84%E4%BB%B6%E8%8A%82%E7%82%B9) 使自定义组件内部的第一层节点由自定义组件本身完全决定。从小程序基础库版本 [`2.11.2`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始支持 */
    virtualHost?: boolean;
  }
}

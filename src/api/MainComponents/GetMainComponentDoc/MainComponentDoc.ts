import type { PureObject } from "hry-types";

/**
 * MainComponent Api 返回类型
 */
export type MainComponentDoc = {
  /**
   * 页面true,组件false  DefineComponent Api 使用
   */
  isPage?: boolean;
  /**
   * 最终组件(页面)可传数据字段
   */
  properties?: PureObject;
  /**
   * this.data中所有数据 SubComponent Api 使用
   */
  allData?: PureObject;
  /**
   * methodsDoc  SubComponent Api使用
   */
  methods?: Record<string, AnyFunction>;
  /**
   * eventsDoc  SubComponent Api使用
   */
  events?: Record<string, AnyFunction>;
  /**
   * customEventsDoc DefineComponent Api 使用
   */
  customEvents?: PureObject;
};

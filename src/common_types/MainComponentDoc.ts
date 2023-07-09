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
  properties?: object;
  /**
   * this.data中所有数据 SubComponent Api 使用
   */
  allData?: object;
  /**
   * methodsDoc  SubComponent Api使用
   */
  methods?: Record<string, Function>;
  /**
   * eventsDoc  SubComponent Api使用
   */
  events?: Record<string, Function>;
  /**
   * customEventsDoc DefineComponent Api 使用
   */
  customEvents?: object;
};

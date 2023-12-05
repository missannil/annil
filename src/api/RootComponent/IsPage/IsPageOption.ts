export type IsPageOption<TIsPage extends boolean> = {
  /**
   * 表示组件是否为页面,默认false,会引起pageLifetimes类型变化
   */
  isPage?: TIsPage;
};

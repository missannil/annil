export type SLotSuperDataOption<TInherit extends PropertyKey[]> = {
  /**
   * 来自父级的数据,关联父级的数据,用于vscod插件判断数据来源
   */
  superDatas?: TInherit;
};

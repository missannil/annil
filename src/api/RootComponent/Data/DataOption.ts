import type { G } from "hry-types";

export type DataOption<
  TData extends object,
  PropertiesKeys extends PropertyKey,
  errMsg extends string = "与properties字段重复",
> = {
  /**
   * 定义实例基本数据,默认下划线(`_`)开头的为内部数据,不会被渲染
   * @remarks 与properties字段重复校验
   * @example
   * ```ts
   * {
   *   //...
   *   data:{
   *      num:123,
   *      _str:'string' //不会被渲染的内部数据
   *   }
   * }
   * ```
   */
  data?:
    & TData
    & G.DuplicateFieldValidator<TData, PropertiesKeys, errMsg>;
};

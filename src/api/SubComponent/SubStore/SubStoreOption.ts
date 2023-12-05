import type { V } from "hry-types";

export type SubStoreOption<TSubStore extends object, legalKeys extends PropertyKey, TPrefix extends string> = {
  /**
   * 全局响应式数据字段,全局store对应数据变化实例对应数据自动setData。
   * 约束为组件properties字段去除inherit和data的剩余字段和内部字段
   * 有非法字段(除了约束字段外的字段)检测
   * @example
   * ```ts
   * {
   *   //...
   *   store: {
   *     aaa_str: () => sroreX.str,
   *   },
   * }
   * ```
   */
  store?:
    & TSubStore
    & V.IllegalFieldValidator<
      TSubStore,
      legalKeys | `_${TPrefix}_${string}`,
      0,
      "",
      "与inherit和data字段重复或前缀错误"
    >;
};

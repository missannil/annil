import type { V } from "hry-types";
import type { StoreConstraint } from "./StoreConstraint";

export type StoreOption<TStore extends StoreConstraint, TDuplicateKeys extends PropertyKey> = {
  /**
   * 全局响应式数据字段,全局store对应数据变化实例对应数据自动setData。与properties和data字段有重复检测
   * @example
   * ```ts
   * {
   *   //...
   *   store: {
   *     responsiveData: () => sroreX.str,
   *   },
   * }
   * ```
   */
  store?:
    & TStore
    & V.DuplicateFieldValidator<TStore, TDuplicateKeys, "字段重复">;
};

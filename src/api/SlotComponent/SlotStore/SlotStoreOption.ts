import type { G } from "hry-types";
import type { StoreConstraint } from "./SlotStoreConstraint";

export type SoltStoreOption<TStore extends StoreConstraint, TDuplicateKeys extends PropertyKey, Prefix extends string> =
  {
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
      & G.DuplicateFieldValidator<TStore, TDuplicateKeys, "字段重复">
      & G.KeyValidator<TStore, `${Prefix}_${string}` | `_${Prefix}_${string}`, "前缀错误">;
  };

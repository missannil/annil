import type { DuplicateFieldValidator } from "../../../types/DuplicateFieldValidator";
import type { Validators } from "../../../types/Validators";
import type { TypeValidator } from "../../RootComponent/Store/StoreOption";
import type { ValidatorPrefix } from "../ChunkData/validatePrefix";
import type { ChunkStoreConstraint } from "./ChunkStoreConstraint";

export type ChunkStoreOption<
  TStore extends ChunkStoreConstraint,
  TDuplicateKeys extends PropertyKey,
  Prefix extends string,
> = {
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
    & Validators<
      [
        DuplicateFieldValidator<TStore, TDuplicateKeys, "字段重复">,
        ValidatorPrefix<TStore, Prefix>,
        TypeValidator<TStore>,
      ]
    >;
};

import type { Func, IfSomeExtends } from "hry-types";
import type { DuplicateFieldValidator } from "../../../types/DuplicateFieldValidator";
import type { Validators } from "../../../types/Validators";
import type { StoreConstraint } from "./StoreConstraint";

export type StoreOption<
  TStore extends StoreConstraint,
  TDuplicateKeys extends PropertyKey,
> = {
  /**
   * 全局响应式数据字段,全局store对应数据变化实例对应数据自动setData。与properties和data字段有重复检测
   * @example
   * ```ts
   *  {
   *   properties:{
   *    useId: String,
   *  }
   *   //...
   *   store: {
   *     responsiveData: () => sroreX.str,
   *     user:(data)=> M_AllUser[data.useId],
   *    _user: {
   *     getter: (data) => M_AllUser[data.useId],
   *     default: null,
   *    },
   *   },
   * }
   * ```
   */
  store?:
    & TStore
    & Validators<[
      DuplicateFieldValidator<TStore, TDuplicateKeys, "字段重复">,
      // TypeValidator<TStore>,
    ]>;
};
/**
 * 验证properties的value类型是否正确
 * @returns unknown | `{ default: () => "⚠️类型错误⚠️" }`
 */
export type TypeValidator<
  TStore,
  Result = {
    [k in keyof TStore]: IfSomeExtends<
      ReturnType<Extract<TStore[k], Func>>,
      undefined,
      () => "⚠️返回类型中不可以包含undefined⚠️",
      unknown
    >;
  },
> = Record<keyof TStore, unknown> extends Result ? unknown : Result;

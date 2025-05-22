import type { G } from "hry-types";
import type { As } from "hry-types/src/Any/As";
import type { IfContains } from "hry-types/src/Any/IfContains";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IsPureObject } from "hry-types/src/Any/IsPureObject";
import type { Func } from "hry-types/src/Misc/Func";
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
      G.DuplicateFieldValidator<TStore, TDuplicateKeys, "字段重复">,
      TypeValidator<TStore>,
    ]>;
};
/**
 * 验证properties的value类型是否正确
 * @returns unknown | `{ default: () => "⚠️类型错误⚠️" }`
 */
export type TypeValidator<
  TStore,
  Result = {
    [k in keyof TStore]: TStore[k] extends {
      getter: (...arg: unknown[]) => infer R;
      default: infer D;
    }
      // 对象形式
      ? IfContains<
        R,
        undefined,
        // 如果包含undefined时
        IfExtends<
          // 是否为纯对象
          IsPureObject<Exclude<R, undefined>>,
          true,
          // 如果是纯对象,则default可以为null
          IfExtends<
            D,
            Exclude<R, undefined> | null,
            unknown,
            { default: () => "⚠️类型错误⚠️" }
          >,
          // 如果不是纯对象,则default只能为getter返回值
          IfExtends<
            D,
            Exclude<R, undefined>,
            unknown,
            { default: () => "⚠️类型错误⚠️" }
          >
        >,
        // 不包含undefined时,报错getter
        { getter: () => "⚠️类型不包含undefined⚠️ " }
      >
      // 非对象形式
      : IfContains<
        ReturnType<As<TStore[k], Func>>,
        undefined,
        () => "⚠️类型包含undefined,应写成对象形式⚠️",
        unknown
      >;
  },
> = Record<keyof TStore, unknown> extends Result ? unknown : Result;

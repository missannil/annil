import type { V } from "hry-types";

export type DataOption<TData extends object, TProperties> = {
  /**
   * 可通过函数返回形式引入基于Mobx的响应式数据
   * @example
   * ```ts
   * {
   *   //...
   *   data:{
   *     reactive_user:() => UserStore.user
   *   }
   * }
   * ```
   */
  data?:
    & TData
    & V.DuplicateFieldValidator<TData, keyof TProperties, "与properties字段重复">;
};

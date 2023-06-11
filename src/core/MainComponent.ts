import type { DataConstraint } from "../types/Data";
import type { DuplicateFieldValidation } from "../types/DuplicateFieldValidation";
import type { IllegalFieldValidation } from "../types/IllegalFieldValidation";
import type { PropertiesConstraint } from "../types/PropertiesConstraint";
import type { IinjectDataDoc } from "./InstanceInject";

type Options<
  TProperties extends object,
  TData,
> = {
  /**
   * @description 可通过 as SpecificType<anyType> 书写任意类型,禁用observable字段,简写或无value字段为必传属性。对象写法有value字段为可选属性.必传字段若为对象类型则加入默认类型null
   */
  properties?:
    & TProperties
    & IllegalFieldValidation<TProperties, "type" | "value" | "optionalTypes">
    & DuplicateFieldValidation<TProperties, keyof IinjectDataDoc, "与inject重复类型">;
  /**
   * 可引入响应式数据(仅支持mobx的 observable)
   * ```ts
   * const storde = observable({
   *   name: "zhao",
   * });
   * MainComponent({
   *   data:{
   *      responsiveName: () => store.name
   *   }
   * })
   * ```
   */
  data?: TData;
  // & ThisType<{
  //   data:
  //     & DataDoc
  //     & Required<PropertiesDoc>
  //     & ComputedDoc
  //     & IinjectDataDoc
  //     & InheritDoc

  // }>;
};

interface Constructor {
  <
    Literal extends
      | string
      | number
      | boolean
      | Literal[]
      | Record<string, Literal>,
    TProperties extends PropertiesConstraint<Literal> = {},
    TData extends DataConstraint = {},
  >(
    options: Options<TProperties, TData>,
  ): TProperties;
}

export const MainComponent: Constructor = function(options): any {
  return options;
};

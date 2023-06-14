import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { GetPropertiesDoc } from "../types/properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "../types/properties/PropertiesConstraint";
import type { DuplicateFieldValidation } from "../types/Validation.ts/DuplicateFieldValidation";
import type { IinjectDataDoc } from "./InstanceInject";

type Options<
  TProperties extends object,
> = {
  /**
   * @description 可通过 as SpecificType<anyType> 书写任意类型,禁用observable字段,简写或无value字段为必传属性。对象写法有value字段为可选属性.必传字段若为对象类型则加入默认类型null
   */
  properties?:
    & TProperties
    & DuplicateFieldValidation<TProperties, keyof IinjectDataDoc, "与inject字段重复">;
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
    PropertiesDoc = IfExtends<
      {},
      TProperties,
      unknown,
      GetPropertiesDoc<TProperties>
    >,
  >(
    options: Options<TProperties>,
  ): PropertiesDoc;
}

export const MainComponent: Constructor = function(options): any {
  return options;
};

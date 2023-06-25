import type { V } from "hry-types";

import type { PropertiesConstraint } from "./PropertiesConstraint";
import type { ValueValidator } from "./ValueValidator";

export type Properties<TProperties extends PropertiesConstraint> = {
  /**
   * @description 可通过 as SpecificType<anyType> 书写任意类型,禁用observable字段,简写或无value字段为必传属性。对象写法有value字段为可选属性.必传字段若为对象类型则加入默认类型null
   */
  properties?:
    & TProperties
    & V.IllegalFieldValidation<TProperties, "value" | "type" | "optionalTypes", 1>
    & ValueValidator<TProperties>;
};

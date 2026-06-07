import type { Validators } from "../../../types/Validators";
import type { PropertiesConstraint } from "./PropertiesConstraint";
import type { PropertiesValueValidator } from "./PropertiesValueValidator";

export type PropertiesOption<
  TProperties extends PropertiesConstraint,
> = {
  /**
   * 可通过 as DetailedType<anyType> 书写任意类型
   * @remarks
   *
   * 禁用observable字段(watch代替)
   *
   * 简写 → 必传，单一类型。对象写法 + optionalTypes → 必传，联合类型。对象写法 + value → 可选传（有默认值），可同时配合 optionalTypes。
   *
   * 有value类型检测和非法字段检测(例如value写出values)
   */
  properties?:
    & TProperties
    & Validators<[
      PropertiesValueValidator<TProperties>,
      // // 放在最后一个，正常返回不是unknown 而是Record<string,unknown>
      // G.IllegalFieldValidator<TProperties, "value" | "type" | "optionalTypes", 1>,
    ]>;
};

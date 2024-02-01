import type { G } from "hry-types";
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
   * 简写或对象写法(无value字段)时为必传属性(组件时必传对象实际类型加入null,页面不加),对象写法有value字段为可选属性.
   *
   * 有value类型检测和非法字段检测(例如value写出values)
   */
  properties?:
    & TProperties
    & Validators<[
      PropertiesValueValidator<TProperties>,
      // 放在最后一个，正常返回不是unknown 而是Record<string,unknown>
      G.IllegalFieldValidator<TProperties, "value" | "type" | "optionalTypes", 1>,
    ]>;
};

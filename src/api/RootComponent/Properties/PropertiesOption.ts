import type { V } from "hry-types";
import type { Validators } from "../../../types/Validators";
import type { PropertiesConstraint } from "./PropertiesConstraint";
import type { PropertiesValueValidator } from "./PropertiesValueValidator";

/**
 * properties 配置字段
 * @remarks 二参 三参为了让AnyPropertiesOption也可以复用这个泛型
 */
export type PropertiesOption<
  TProperties extends PropertiesConstraint,
> // Prefix extends string = "",
 = // DuplicateFieldCheck extends PropertyKey = "",
  {
    /**
     * 可通过 as DetailedType<anyType> 书写任意类型
     * @remarks 禁用observable字段,简写或对象写法无value字段时为必传属性(必传对象类型加入null类型),对象写法有value字段为可选属性.
     */
    properties?:
      & TProperties
      & Validators<[
        // PrefixValidator<TProperties, Prefix>,
        PropertiesValueValidator<TProperties>,
        // V.DuplicateFieldValidator<TProperties, DuplicateFieldCheck>,
        // 放在最后一个，正常返回不是unknown 而是Record<string,unknown>
        V.IllegalFieldValidator<TProperties, "value" | "type" | "optionalTypes", 1>,
      ]>;
  };

// export type PrefixValidator<
//   G extends object,
//   TPrefix extends string,
//   Message extends string = "前缀错误",
//   Result = TPrefix extends "" ? unknown : {
//     [
//       k in keyof G as k extends `${TPrefix}_${string}` ? never : k
//     ]: G[k] extends object ? `⚠️${Message}` : () => `⚠️${Message}`;
//   },
// > = EmptyObject extends Result ? unknown : Result;

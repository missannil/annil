import type { V } from "hry-types";
import type { MainComponentDoc } from "../../../types/MainComponentDoc";
import type { PrefixValidator } from "../../../types/PrefixValidator";
import type { Validators } from "../../../types/Validators";

export type SubProperties<
  TProperties extends object,
  CurrentPrefix extends string,
  TMainComponentDoc extends MainComponentDoc,
> = {
  properties?:
    & TProperties
    & Validators<[
      PrefixValidator<TProperties, CurrentPrefix>,
      V.DuplicateFieldValidator<TProperties, keyof TMainComponentDoc["allData"], "与主组件字段重复">,
      V.IllegalFieldValidator<TProperties, "value" | "type" | "optionalTypes", 1>,
    ]>;
};

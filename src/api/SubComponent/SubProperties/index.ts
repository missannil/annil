import type { V } from "hry-types";
import type { MainComponentDoc } from "../../../types/MainComponentDoc";
import type { PrefixValidator } from "../../../types/PrefixValidator";

export type SubProperties<
  TProperties extends object,
  CurrentPrefix extends string,
  TMainComponentDoc extends MainComponentDoc,
> = {
  properties?:
    & TProperties
    & PrefixValidator<TProperties, CurrentPrefix>
    & V.IllegalFieldValidator<TProperties, "value" | "type" | "optionalTypes", 1>
    & V.DuplicateFieldValidator<TProperties, keyof TMainComponentDoc["allData"], "与主组件字段重复">;
};

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Select } from "hry-types/src/Object/Select";
import type { AddNullForObject } from "../../../types/AddNullForObject";
import type { InferSpecificType } from "../../../types/InferSpecificType";
import type { PropertiesConstraint, RequiredSingle, RequiredType } from "./PropertiesConstraint";

/**
 * 获取properties必传字段的文档类型
 * @remarks 小程序中必传字段如果是object,默认类型为null,所以文档类型要联合上null类型
 */
export type GetRequiredDoc<
  TProperties extends PropertiesConstraint,
  // @ts-ignore
  Required extends Record<string, RequiredType> = Select<TProperties, RequiredType>,
> = {
  [k in keyof Required]: IfExtends<
    Required[k],
    RequiredSingle,
    AddNullForObject<InferSpecificType<Required[k]>>,
    // @ts-ignore Required[k] 必为 RequiredUnion
    | AddNullForObject<InferSpecificType<Required[k]["type"]>>
    // @ts-ignore Required[k] 必为 RequiredUnion
    | AddNullForObject<InferSpecificType<Required[k]["optionalTypes"][number]>>
  >;
};

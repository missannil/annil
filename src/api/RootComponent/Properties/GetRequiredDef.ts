import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { RequiredSingle, RequiredType, RequiredUnion } from "./PropertiesConstraint";

/**
 * 获取properties必传字段的文档类型
 * @remarks 小程序中必传字段如果是object,默认类型为null,所以组件文档对象类型要联合上null类型
 */
export type GetRequiredDef<
  TProperties extends Record<string, RequiredType>,
> = {
  -readonly [k in keyof TProperties]: TProperties[k] extends RequiredSingle ? InferDetailedType<TProperties[k]>
    : TProperties[k] extends RequiredUnion ?
        | InferDetailedType<TProperties[k]["type"]>
        | InferDetailedType<TProperties[k]["optionalTypes"][number]>
    : never;
};

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { RequiredSingle, RequiredType } from "./PropertiesConstraint";

/**
 * 获取properties必传字段的文档类型
 * @remarks 小程序中必传字段如果是object,默认类型为null,所以组件文档对象类型要联合上null类型
 */
export type GetRequiredDoc<
  TProperties extends Record<string, RequiredType>,
> // TIsPage extends boolean,
 = {
  -readonly [k in keyof TProperties]: IfExtends<
    TProperties[k],
    // 非对象写法
    RequiredSingle,
    InferDetailedType<TProperties[k]>,
    // @ts-ignore TProperties[k] 必为 RequiredUnion
    | InferDetailedType<TProperties[k]["type"]>
    // @ts-ignore TProperties[k] 必为 RequiredUnion
    | InferDetailedType<TProperties[k]["optionalTypes"][number]>
  >;
};

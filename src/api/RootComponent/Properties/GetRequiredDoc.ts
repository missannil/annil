import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { AddNullForObject } from "../../../types/AddNullForObject";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { RequiredSingle, RequiredType } from "./PropertiesConstraint";

/**
 * 获取properties必传字段的文档类型
 * @remarks 小程序中必传字段如果是object,默认类型为null,所以组件文档对象类型要联合上null类型
 */
export type GetRequiredDoc<
  TProperties extends Record<string, RequiredType>,
  TIsPage extends boolean,
> = {
  -readonly [k in keyof TProperties]: IfExtends<
    TProperties[k],
    // 非对象写法
    RequiredSingle,
    IfExtends<
      false,
      TIsPage,
      // 组件的对象类型加null
      AddNullForObject<InferDetailedType<TProperties[k]>>,
      // 页面的对象类型不加null
      InferDetailedType<TProperties[k]>
    >,
    // 对象写法 RequiredUnion
    IfExtends<
      false,
      TIsPage,
      // 组件的对象类型加null
      AddNullForObject<
        // @ts-ignore TProperties[k] 必为 RequiredUnion
        | InferDetailedType<TProperties[k]["type"]>
        // @ts-ignore TProperties[k] 必为 RequiredUnion
        | InferDetailedType<TProperties[k]["optionalTypes"][number]>
      >,
      // 页面的对象类型不加null
      // @ts-ignore TProperties[k] 必为 RequiredUnion
      InferDetailedType<TProperties[k]["type"]> | InferDetailedType<TProperties[k]["optionalTypes"][number]>
    >
  >;
};

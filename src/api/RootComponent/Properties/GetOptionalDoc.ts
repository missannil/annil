import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { AddNullForObject } from "../../../types/AddNullForObject";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { OptionalType } from "./PropertiesConstraint";

/**
 * 获取properties可传字段文档类型
 */
export type GetOptionalDoc<
  TOptionalProperties extends Record<string, OptionalType>,
  TIsPage extends boolean,
> = {
  -readonly [k in keyof TOptionalProperties]?: IfExtends<
    unknown,
    TOptionalProperties[k]["optionalTypes"],
    IfExtends<
      false,
      TIsPage,
      // 组件时 对象加null
      AddNullForObject<InferDetailedType<TOptionalProperties[k]["type"]>>,
      // 页面时 对象不加
      InferDetailedType<TOptionalProperties[k]["type"]>
    >,
    IfExtends<
      false,
      TIsPage,
      // 组件时 对象加null
      AddNullForObject<
        | InferDetailedType<TOptionalProperties[k]["type"]>
        | InferDetailedType<(TOptionalProperties[k]["optionalTypes"] & {})[number]>
      >,
      // 页面时 对象不加
      | InferDetailedType<TOptionalProperties[k]["type"]>
      | InferDetailedType<(TOptionalProperties[k]["optionalTypes"] & {})[number]>
    >
  >;
};

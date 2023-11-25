import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Select } from "hry-types/src/Object/Select";
import type { AddNullForObject } from "../../../types/AddNullForObject";
import type { InferSpecificType } from "../../../types/InferSpecificType";
import type { OptionalType, PropertiesConstraint } from "./PropertiesConstraint";

/**
 * 获取properties可传字段文档类型
 */
export type GetOptionalDoc<
  TProperties extends PropertiesConstraint,
  TIsPage extends boolean,
  // @ts-ignore
  Optional extends Record<string, OptionalType> = Select<TProperties, OptionalType>,
> = {
  [k in keyof Optional]?: IfExtends<
    unknown,
    Optional[k]["optionalTypes"],
    IfExtends<
      false,
      TIsPage,
      // 组件时 对象加null
      AddNullForObject<InferSpecificType<Optional[k]["type"]>>,
      // 页面时 对象不加
      InferSpecificType<Optional[k]["type"]>
    >,
    IfExtends<
      false,
      TIsPage,
      // 组件时 对象加null
      AddNullForObject<
        InferSpecificType<Optional[k]["type"]> | InferSpecificType<(Optional[k]["optionalTypes"] & {})[number]>
      >,
      // 页面时 对象不加
      InferSpecificType<Optional[k]["type"]> | InferSpecificType<(Optional[k]["optionalTypes"] & {})[number]>
    >
  >;
};

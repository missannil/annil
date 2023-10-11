import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Select } from "hry-types/src/Object/Select";
import type { InferSpecificType } from "../../../types/InferSpecificType";
import type { OptionalType, PropertiesConstraint } from "./PropertiesConstraint";

/**
 * 获取properties可传字段文档类型
 */
export type GetOptionalDoc<
  TProperties extends PropertiesConstraint,
  // @ts-ignore
  Optional extends Record<string, OptionalType> = Select<TProperties, OptionalType>,
> = {
  [k in keyof Optional]?: IfExtends<
    unknown,
    Optional[k]["optionalTypes"],
    InferSpecificType<Optional[k]["type"]>,
    InferSpecificType<Optional[k]["type"]> | InferSpecificType<(Optional[k]["optionalTypes"] & {})[number]>
  >;
};

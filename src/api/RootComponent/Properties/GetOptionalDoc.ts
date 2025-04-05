import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { OptionalType } from "./PropertiesConstraint";

/**
 * 获取properties可传字段文档类型
 */
export type GetOptionalDoc<
  TOptionalProperties extends Record<string, OptionalType>,
> = {
  -readonly [k in keyof TOptionalProperties]?: IfExtends<
    unknown,
    TOptionalProperties[k]["optionalTypes"],
    InferDetailedType<TOptionalProperties[k]["type"]>,
    | InferDetailedType<TOptionalProperties[k]["type"]>
    | InferDetailedType<(TOptionalProperties[k]["optionalTypes"] & {})[number]>
  >;
};

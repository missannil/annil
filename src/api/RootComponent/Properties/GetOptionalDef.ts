import type { IfAllExtends } from "hry-types";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { OptionalType } from "./PropertiesConstraint";

/**
 * 获取properties可传字段文档类型
 */
export type GetOptionalDef<
  TOptionalProperties extends Record<string, OptionalType>,
> = {
  -readonly [k in keyof TOptionalProperties]?: IfAllExtends<
    unknown,
    TOptionalProperties[k]["optionalTypes"],
    InferDetailedType<TOptionalProperties[k]["type"]>,
    | InferDetailedType<TOptionalProperties[k]["type"]>
    | InferDetailedType<(TOptionalProperties[k]["optionalTypes"] & {})[number]>
  >;
};

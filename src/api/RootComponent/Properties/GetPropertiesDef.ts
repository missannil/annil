import type { Select } from "hry-types/src/Object/Select";

import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { GetOptionalDef } from "./GetOptionalDef";

import type { GetRequiredDef } from "./GetRequiredDef";
import type { OptionalType, PropertiesConstraint } from "./PropertiesConstraint";

type _GetPropertiesDef<
  TProperties extends PropertiesConstraint,
  OptionalDef extends object =
    // @ts-expect-error ddd
    GetOptionalDef<Select<TProperties, OptionalType>>,
  RequiredDef extends object =
    // @ts-expect-error dddf
    GetRequiredDef<Omit<TProperties, keyof OptionalDef>>,
> = ComputeIntersection<OptionalDef & RequiredDef>;

/**
 * properties字段的文档类型
 * @remarks 必传的字段如果是object,要联合上null类型,选传的object根据是否是页面来决定是否加null
 */
export type GetPropertiesDef<
  TProperties extends PropertiesConstraint,
> = _GetPropertiesDef<TProperties>;

import type { _Select } from "hry-types";

import type { _SimplifyIntersection } from "hry-types";
import type { GetOptionalDef } from "./GetOptionalDef";

import type { As } from "hry-types";
import type { GetRequiredDef } from "./GetRequiredDef";
import type { OptionalType, PropertiesConstraint, RequiredType } from "./PropertiesConstraint";

type _GetPropertiesDef<
  TProperties extends PropertiesConstraint,
  OptionalDef extends object = GetOptionalDef<As<_Select<TProperties, OptionalType>, Record<string, OptionalType>>>,
  RequiredDef extends object = GetRequiredDef<As<Omit<TProperties, keyof OptionalDef>, Record<string, RequiredType>>>,
> = _SimplifyIntersection<OptionalDef & RequiredDef>;

/**
 * properties字段的文档类型
 * @remarks 必传的字段如果是object,要联合上null类型,选传的object根据是否是页面来决定是否加null
 */
export type GetPropertiesDef<
  TProperties extends PropertiesConstraint,
> = _GetPropertiesDef<TProperties>;

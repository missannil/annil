import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Select } from "hry-types/src/Object/Select";

import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { GetOptionalDoc } from "./GetOptionalDoc";
import type { GetRequiredDoc } from "./GetRequiredDoc";
import type { OptionalType, PropertiesConstraint } from "./PropertiesConstraint";

type _GetPropertiesDoc<
  TProperties extends PropertiesConstraint,
  Type extends "Required" | "Optional" | "all" = "all",
  OptionalDoc = GetOptionalDoc<Select<TProperties, OptionalType>>,
  RequiredDoc = GetRequiredDoc<Omit<TProperties, keyof OptionalDoc>>,
> = IfExtends<
  Type,
  "all",
  // @ts-ignore
  ComputeIntersection<OptionalDoc & RequiredDoc>,
  IfExtends<Type, "Optional", OptionalDoc, RequiredDoc>
>;

/**
 * properties字段的文档类型
 * @param TProperties - `PropertiesConstraint`
 * @param Type - "Required" | "Optional" | "all"
 * @returns  `GetRequiredDoc` | `GetOptionalDoc` | (`GetOptionalDoc` & `GetRequiredDoc`)
 */
export type GetPropertiesDoc<
  TProperties extends PropertiesConstraint,
  Type extends "Required" | "Optional" | "all" = "all",
> = _GetPropertiesDoc<TProperties, Type>;

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { SelectKeys } from "hry-types/src/Object/_api";
import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { Select } from "hry-types/src/Object/Select";
import type { GetOptionalDoc } from "./GetOptionalDoc";
import type { GetRequiredDoc } from "./GetRequiredDoc";
import type { OptionalTypes, PropertiesConstraint, RequiredTypes } from "./PropertiesConstraint";

/**
 * 获取properties的可选字段
 * @param T PropertiesConstraint
 * @returns
 */
export type GetOptional<
  T extends PropertiesConstraint,
> = Select<T, OptionalTypes>;

export type GetRequired<
  T extends PropertiesConstraint,
> = Select<T, RequiredTypes>;

/**
 * 获取properties的文档类型
 * @returns AnyObject
 */
export type GetPropertiesDoc<
  T extends PropertiesConstraint,
  TType extends "Required" | "Optional" | "all" = "all",
  OptionalKeys extends keyof T = SelectKeys<T, OptionalTypes>,
  OptionalDoc = GetOptionalDoc<Pick<T, OptionalKeys>>,
  RequiredDoc = GetRequiredDoc<Omit<T, keyof OptionalDoc>>,
> = IfExtends<
  TType,
  "all",
  MergeIntersection<OptionalDoc & RequiredDoc>,
  IfExtends<TType, "Optional", OptionalDoc, RequiredDoc>
>;

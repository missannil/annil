import type { DetailedType } from "../../../types/DetailedType";

/**
 * properties 必传(单一)类型
 */
export type RequiredSingle = DetailedType;

/**
 * properties 必传(联合)类型
 */
export type RequiredUnion = {
  type: DetailedType;
  optionalTypes: DetailedType[];
};

/**
 * properties 必传类型
 */
export type RequiredType = RequiredUnion | RequiredSingle;

/**
 * properties 选传类型
 */
export type OptionalType = {
  type: DetailedType;
  value: unknown;
  optionalTypes?: DetailedType[];
};

/**
 * Properties 字段类型
 */
export type PropertiesTypes = OptionalType | RequiredType;

/**
 * RootComponent API properties 字段约束
 */
export type PropertiesConstraint = Record<string, PropertiesTypes>;

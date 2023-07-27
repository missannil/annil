import type { SpecificType } from "../../../types/SpecificType";

/**
 * properties 必传(单一)类型
 */
export type RequiredSingle = SpecificType;

/**
 * properties 必传(联合)类型
 */
export type RequiredUnion<Literal = unknown> = {
  type: SpecificType<Literal>;
  optionalTypes: SpecificType[];
};

/**
 * properties 必传类型
 */
export type RequiredType<Literal = unknown> = RequiredUnion<Literal> | RequiredSingle;

/**
 * properties 选传类型
 */
export type OptionalType<Literal = unknown> = {
  type: SpecificType<Literal>;
  value: Literal;
  optionalTypes?: SpecificType[];
};

/**
 * Properties 字段类型
 */
export type PropertiesTypes<Literal = unknown> = OptionalType<Literal> | RequiredType<Literal>;

/**
 * RootComponent API properties 字段约束
 */
export type PropertiesConstraint<Literal = unknown> = Record<string, PropertiesTypes<Literal>>;

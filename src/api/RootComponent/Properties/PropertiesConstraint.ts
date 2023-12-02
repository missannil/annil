import type { DetailedType } from "../../../types/DetailedType";

/**
 * properties 必传(单一)类型
 */
export type RequiredSingle = DetailedType;

/**
 * properties 必传(联合)类型
 */
export type RequiredUnion<Literal = unknown> = {
  type: DetailedType<Literal>;
  optionalTypes: DetailedType[];
};

/**
 * properties 必传类型
 */
export type RequiredType<Literal = unknown> = RequiredUnion<Literal> | RequiredSingle;

/**
 * properties 选传类型
 */
export type OptionalType<Literal = unknown> = {
  type: DetailedType<Literal>;
  value: Literal;
  optionalTypes?: DetailedType[];
};

/**
 * Properties 字段类型
 */
export type PropertiesTypes<Literal = unknown> = OptionalType<Literal> | RequiredType<Literal>;

/**
 * RootComponent API properties 字段约束
 */
export type PropertiesConstraint<Literal = unknown> = Record<string, PropertiesTypes<Literal>>;

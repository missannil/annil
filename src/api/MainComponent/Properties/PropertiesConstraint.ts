import type { SpecificType } from "../../../types/SpecificType";

/**
 * 必传单一类型
 */
export type RequiredSingle = SpecificType;

/**
 * 必传联合类型
 */
export type RequiredUnion<Literal = unknown> = {
  type: SpecificType<Literal>;
  optionalTypes: SpecificType[];
};

export type RequiredTypes<Literal = unknown> = RequiredUnion<Literal> | RequiredSingle;

/**
 * 选传类型
 */
export type OptionalTypes<Literal = unknown> = {
  type: SpecificType<Literal>;
  value: Literal;
  optionalTypes?: SpecificType[];
};

/**
 * Properties类型
 */
export type PropertiesTypes<Literal = unknown> = OptionalTypes<Literal> | RequiredTypes<Literal>;

/**
 * properties字段约束
 */
export type PropertiesConstraint<Literal = unknown> = Record<string, PropertiesTypes<Literal>>;

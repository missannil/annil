import type { SpecificType } from "../../../common_types/SpecificType";

/**
 * @description 必传单一类型
 */
export type RequiredSingle = SpecificType;

/**
 * @description 必传联合类型
 */
export type RequiredUnion<Literal = unknown> = {
  type: SpecificType<Literal>;
  optionalTypes: SpecificType[];
};

export type RequiredTypes<Literal = unknown> = RequiredUnion<Literal> | RequiredSingle;

/**
 * @description 选传类型
 */
export type OptionalTypes<Literal = unknown> = {
  type: SpecificType<Literal>;
  value: Literal;
  optionalTypes?: SpecificType[];
};

/**
 * @description Properties类型
 */
export type PropertiesTypes<Literal = unknown> = OptionalTypes<Literal> | RequiredTypes<Literal>;

/**
 * @description properties字段约束
 */
export type PropertiesConstraint<Literal = unknown> = Record<string, PropertiesTypes<Literal>>;

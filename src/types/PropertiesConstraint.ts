/**
 * @description 在使用js构造函数(例如Object)表示类型时,通过as 为TS指定具体类型。
 * @example
 * ```
 * const user = {
 * 		gender:String as SpecificType<'male'|'female'>
 * }
 */
export type SpecificType<T = unknown> = { new(...arg: unknown[]): T } | { (): T };

/**
 * @description properties简写
 */
export type ShortProperties = SpecificType;

/**
 * @description properties全写
 */
export type FullProperties<Literal = unknown> = {
  type: SpecificType<Literal>;
  value?: Literal;
  optionalTypes?: SpecificType[];
};

/**
 * @description Properties字段值类型
 */
export type AllProperties<Literal = unknown> = FullProperties<Literal> | ShortProperties;

/**
 * @description properties字段约束
 */
export type PropertiesConstraint<Literal = unknown> = Record<string, AllProperties<Literal>>;
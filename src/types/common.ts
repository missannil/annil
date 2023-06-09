import type { PureObject, IfExtends } from 'hry-types';

/**
 * @description 在使用js构造函数(例如Object)表示类型时,通过as 为TS指定具体类型。
 * @example
 * ```
 * const user = {
 * 		gender:String as SpecificType<'male'|'female'>
 * }
 *
 */
export type SpecificType<T = unknown> = { new (...arg: unknown[]): T } | { (): T };

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

/**
 * @description 泛型对象的子对象非法字段验证
 * @example
 * const fun = <O extends Record<string, { type?: unknown; value?: unknown }>>(
 * 	obj: O & IllegalFieldValidation<O, 'type' | 'value'>
 * ): void => {
 * 	obj;
 * };
 *
 * fun({
 * 	num: {
 * 		type: Number, // pass
 * 		value: 123   // pass
 * 	},
 * 	str:{
 * 		types: String, // error
 * 	//  ^^^^^
 * 		value: 'str'
 * 	},
 * 	bool:{
 * 		type:Boolean,
 * 		values: true // error
 * 	//  ^^^^^^
 * 	}
 * });
 *
 *
 */
export type IllegalFieldValidation<
	O extends object,
	IllegalKeys extends string = 'type' | 'value' | 'optionalTypes',
	ResultObj = {
		[k in keyof O as O[k] extends PureObject
			? Exclude<keyof O[k], IllegalKeys> extends never
				? never
				: k
			: never]: {
			[s in Exclude<keyof O[k], IllegalKeys>]: O[k][s] extends Function
				? '字段非法'
				: () => '字段非法';
		};
	}
> = IfExtends<{}, O, unknown, ResultObj>;

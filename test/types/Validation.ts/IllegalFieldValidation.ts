import type { AnyFunction, PureObject } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";

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
 */
export type IllegalFieldValidation<
  O extends object,
  IllegalKeys extends string,
  Prompt extends string = "字段非法",
  ResultObj = IfExtends<
    {},
    O,
    unknown,
    {
      [
        k in keyof O as O[k] extends PureObject ? Exclude<keyof O[k], IllegalKeys> extends never ? never
          : k
          : never
      ]: {
        [s in Exclude<keyof O[k], IllegalKeys>]: O[k][s] extends AnyFunction ? `⚠️${Prompt}⚠️`
          : () => `⚠️${Prompt}⚠️`;
      };
    }
  >,
> = IfExtends<{}, ResultObj, unknown, ResultObj>;

// const fun = <O extends Record<string, { type?: unknown; value?: unknown }>>(
//   obj: O & IllegalFieldValidation<O, "type" | "value">,
// ): void => {
//   obj;
// };

// fun({
//   num: {
//     type: Number, // pass
//     value: 123, // pass
//   },
//   str: {
//     types: String, // error
//     //  ^^^^^
//     value: "str",
//   },
//   bool: {
//     type: Boolean,
//     values: true, // error
//     //  ^^^^^^
//   },
// });

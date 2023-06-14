import type { AnyFunction, PureObject } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";

/**
 * @description 泛型对象的子对象非法字段验证
 */
export type IllegalFieldValidation<
  O extends object,
  IllegalKeys extends string,
  Prompt extends string = "字段非法",
  ResultObj = {
    [
      k in keyof O as O[k] extends PureObject ? Exclude<keyof O[k], IllegalKeys> extends never ? never
        : k
        : never
    ]: {
      [s in Exclude<keyof O[k], IllegalKeys>]: O[k][s] extends AnyFunction ? `⚠️${Prompt}⚠️`
        : () => `⚠️${Prompt}⚠️`;
    };
  },
> = IfExtends<{}, ResultObj, unknown, ResultObj>;

// export type ValidatorInvalidFields<
//   O extends object,
//   TCorrectFields extends string = "type" | "value" | "optionalTypes",
//   hasErrFields = {
//     [
//       k in keyof O as O[k] extends PureObject ? Exclude<keyof O[k], TCorrectFields> extends never ? never
//         : k
//         : never
//     ]: {
//       [s in Exclude<keyof O[k], TCorrectFields>]: () => "错误的字段";
//     };
//   },
// > = IfExtends<{}, O, unknown, hasErrFields>;

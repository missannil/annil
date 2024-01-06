import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";

type _AssignValues<Target, Source, UniqueKey extends keyof Target> = ComputeIntersection<
  & { [k in UniqueKey]: Target[k] }
  // @ts-ignore
  & { [k in Exclude<keyof Target, UniqueKey>]: Source[k] }
>;

/**
 * Target与Source相同的key类型变为Source的类型
 * @example
 * ```ts
 * type obj = { a: "a"; b: "b"; c: boolean };
 * type obj2 = { a: number; b: string; d: number };
 * type test = AssignValues<obj, obj2>;
 * //  test = { a: number; b: string; c: boolean}
 * type test1 = AssignValues<unknown, obj2>; // unknown
 * ```
 */
export type AssignValues<Target, Source> = IfExtends<
  unknown,
  Target,
  unknown,
  _AssignValues<Target, Source, Exclude<keyof Target, keyof Source>>
>;

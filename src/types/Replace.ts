import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";

type _Replace<Target, Source, DifferentKeys extends keyof Target, SameKey extends keyof Source> = ComputeIntersection<
  & { [k in DifferentKeys]: Target[k] }
  & { [k in SameKey]: Source[k] }
>;

/**
 * Target与Source相同的key类型替换为Source的类型
 * @example
 * ```ts
 * type obj = { a: "a"; b: "b"; c: boolean };
 * type obj2 = { a: number; b: string; d: number };
 * type test = Replace<obj, obj2>;
 * //  test = { a: number; b: string; c: boolean}
 * type test1 = Replace<{}, obj2>; // {}
 * ```
 */
export type Replace<Target extends object, Source extends object> = _Replace<
  Target,
  Source,
  Exclude<keyof Target, keyof Source>,
  Extract<keyof Target, keyof Source>
>;

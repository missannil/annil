import type { ComponentDoc } from "./ComponentDoc";
import type { Drop } from "./Drop";
import type { ListOfSamePrimitive } from "./ListOfSamePrimitive";
import type { RestorePropTypeOfList } from "./RestorePropTypeOfList";
import type { SpecificType } from "./SpecificType";

/**
 * 还原properties描述
 * @example
 * ```ts
 * type doc = {properties:{a:'1'|'2',b:boolean,c:string[],d:{name:string}}}
 * type test = RestorePropertiesDoc<doc>
 * //=> {a: "1" | "2" | {type: "1" | "2"; value?: "1" | "2";}; b: boolean | {type: boolean; value?: boolean;}; c: string[] | {type: string[]; value?: string[];}; d: {name: string;} | {type: {name: string;}; value?: {name: string;};}}
 * ```
 */
export type RestorePropertiesDoc<T extends ComponentDoc> = {
  [k in keyof T]?: ListOfSamePrimitive<T[k]> extends infer R extends unknown[]
    ? R["length"] extends 1 ? SpecificType<R[0]> | { type: SpecificType<R[0]>; value: R[0] }
    : {
      type: SpecificType<R[0]>;
      value?: R[0];
      optionalTypes?: RestorePropTypeOfList<Drop<R, R[0]>>[number][];
    }
    : never;
};

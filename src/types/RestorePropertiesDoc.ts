// import type { ComponentDoc } from "../api/DefineComponent/CreateDoc/ComponentDoc";
// import type { Drop } from "./Drop";

// import type { ListOfSamePrimitive } from "./ListOfSamePrimitive";
// import type { ReStorePropTypeOfList } from "./ReStorePropTypeOfList";
// import type { DetailedType } from "./DetailedType";

/**
 * 还原properties描述
 * @example
 * ```ts
 * type doc = {properties:{a:'1'|'2',b:boolean,c:string[],d:{name:string}}}
 * type test = ReStorePropertiesDoc<doc>
 * //=> {a: "1" | "2" | {type: "1" | "2"; value?: "1" | "2";}; b: boolean | {type: boolean; value?: boolean;}; c: string[] | {type: string[]; value?: string[];}; d: {name: string;} | {type: {name: string;}; value?: {name: string;};}}
 * ```
 */
// type ReStorePropertiesDoc<T extends ComponentDoc> = {
//   [k in keyof T]?: ListOfSamePrimitive<T[k]> extends infer R extends unknown[]
//     ? R["length"] extends 1 ? DetailedType<R[0]> | { type: DetailedType<R[0]>; value: R[0] }
//     : {
//       type: DetailedType<R[0]>;
//       value?: R[0];
//       optionalTypes?: ReStorePropTypeOfList<Drop<R, R[0]>>[number][];
//     }
//     : never;
// };

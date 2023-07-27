import type { IsUnion } from "hry-types/src/Any/IsUnion";
import type { Last } from "hry-types/src/Union/Last";

type _UnionToComma<U, Prev extends string> = [U] extends [never] ? Prev
  : _UnionToComma<Exclude<U, Last<U>>, `${Last<U> & string}、${Prev}`>;

export type UnionToComma<U extends string> = IsUnion<U> extends true
  ? _UnionToComma<Exclude<U, Last<U>>, Last<U> & string>
  : U;

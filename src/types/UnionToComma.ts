import type { _ExtractUnionMember, IsUnion } from "hry-types";

type _UnionToComma<U, Prev extends string> = [U] extends [never] ? Prev
  : _UnionToComma<Exclude<U, _ExtractUnionMember<U>>, `${_ExtractUnionMember<U> & string}、${Prev}`>;

export type UnionToComma<U extends string> = IsUnion<U> extends true
  ? _UnionToComma<Exclude<U, _ExtractUnionMember<U>>, _ExtractUnionMember<U> & string>
  : U;

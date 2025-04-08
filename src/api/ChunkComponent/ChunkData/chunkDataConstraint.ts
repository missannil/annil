import type { IfExtends } from "hry-types/src/Any/IfExtends";

export type ChunkDataConstraint<Prefix extends string> = IfExtends<
  "",
  Prefix,
  {},
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  { [k in (`${Prefix}_${string}` | `_${Prefix}_${string}`)]: unknown }
>;

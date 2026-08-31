import type { IfAllExtends } from "hry-types";

export type ChunkDataConstraint<Prefix extends string> = IfAllExtends<
  "",
  Prefix,
  {},
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  { [k in (`${Prefix}_${string}` | `_${Prefix}_${string}`)]: unknown }
>;

export type RemoveNever<T extends unknown[]> = T extends [
  infer A,
  ...infer B,
] ? [A] extends [never] ? RemoveNever<B>
  : [A, ...RemoveNever<B>]
  : T;

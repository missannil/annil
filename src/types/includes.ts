export type Includes<S extends string, searchString extends string> = S extends `${string}${searchString}${string}`
  ? true
  : false;

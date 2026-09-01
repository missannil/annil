export type NonReadonly<T> = {
  -readonly [K in keyof T]: T[K];
};

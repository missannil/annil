export type Shift<L extends readonly unknown[]> = L extends [unknown, ...infer Rest] ? Rest
  : [];

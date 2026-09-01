export type Simplify<T> = T extends unknown ? { [k in keyof T]: T[k] } : never;

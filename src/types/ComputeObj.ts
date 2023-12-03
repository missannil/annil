export type ComputeObject<T> = T extends unknown ? { [k in keyof T]: T[k] } : never;

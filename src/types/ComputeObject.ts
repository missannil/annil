export type ComputeObject<T> = T extends unknown ? { [K in keyof T]: T[K] } : never;

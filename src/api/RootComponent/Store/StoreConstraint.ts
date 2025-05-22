export type Getter<T extends object = object, R = unknown> = (data: T) => R;

export type WithDefault<T extends object = object, R = unknown> = {
  getter: Getter<T, R | undefined>;
  default: unknown;
};

export type StoreConstraint<T extends object = object> = Record<string, Getter<T> | WithDefault<T>>;

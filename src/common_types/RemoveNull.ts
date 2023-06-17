export type RemoveNull<T extends object> = {
  [k in keyof T]: T[k] & {};
};

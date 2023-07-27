export type SubComputedConstraint<T = {}> = {
  [k in keyof T]?: () => T[k];
};

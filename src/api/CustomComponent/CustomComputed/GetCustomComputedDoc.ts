// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetCustomComputedDoc<TComputed extends Record<string, any>> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};

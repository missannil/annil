// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetSubComputedDoc<TComputed extends Record<string, any>> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};

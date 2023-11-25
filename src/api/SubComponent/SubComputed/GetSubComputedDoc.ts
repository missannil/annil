export type GetSubComputedDoc<TComputed extends AnyObject> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};

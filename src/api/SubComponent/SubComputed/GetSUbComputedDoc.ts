// @ts-ignore
export type GetSubComputedDoc<TComputed extends object> = { [k in keyof TComputed]: ReturnType<TComputed[k]> };

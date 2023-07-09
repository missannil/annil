import type { A } from "hry-types";

// 给对象的key加前缀,连接符 '_' ,并且给对象的值加null
export type AddPrefixAndNull<O, TPrefix extends string = ""> = {
  [k in keyof O as TPrefix extends "" ? k : `${TPrefix}_${k & string}`]: A.IsNonArrNonFuncObject<O[k]> extends true
    ? O[k] | null
    : O[k];
};

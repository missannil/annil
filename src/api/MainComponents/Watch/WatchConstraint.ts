import type { IfEquals } from "hry-types/src/Any/IfEquals";
export type IntersectOf<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type OmitNull<T extends object> = { [k in keyof T]: NonNullable<T[k]> };
type UnionAllKeys<U> = U extends unknown ? keyof U : never;
type getValueType<V, Key, UnionMerge = IntersectOf<V>> = Key extends keyof UnionMerge ? UnionMerge[Key] : never;
type _OverWriteWatchValue<Keys, Value> = {
  // 对 xxx.** 不动  对 xxx.yyy.** 和 xxx.yyy 改值类型
  [k in Keys as k extends `${string}.${string}` ? k : never]?: (
    newValue: k extends `${infer L}.${infer R}`
      ? L extends keyof Value ? R extends UnionAllKeys<Value[L]> ? getValueType<Value[L], R>
        : never
      : never
      : never,
    oldValue: k extends `${infer L}.${infer R}`
      ? L extends keyof Value ? R extends UnionAllKeys<Value[L]> ? getValueType<Value[L], R>
        : never
      : never
      : never,
  ) => void;
};
type _StandardWatch<T> =
  // 全等判断 === !!!暂时不是
  & {
    [k in keyof T]?: (newValue: T[k], oldValue: T[k]) => void;
  }
  & // & {
  //   // 为数组加和对象加 **  JSON.stringify 判断
  //   [k in keyof T as T[k] extends object ? `${k & string}.**` : never]?: (
  //     newValue: T[k],
  //     oldValue: T[k],
  //   ) => void;
  // }
  {
    // 为对象加子字段 值为unknwon 等待重写  (无法获取as后的子字段类型 因为不知道as后映射的字符串具体是什么) 4.7可以使用 infer extends了
    [
      k in keyof T as T[k] extends any[] ? never
        : T[k] extends object ? `${k & string}.${UnionAllKeys<T[k]> & string}` //  ObjFieldSecondFloor<T[k]>==> keyof T[k]
        : never
    ]?: unknown;
  };

export type WatchConstraint<O extends object, StandardWatch = _StandardWatch<OmitNull<O & {}>>> = IfEquals<
  O,
  unknown,
  never,
  StandardWatch & _OverWriteWatchValue<keyof StandardWatch, OmitNull<O & {}>>
>;

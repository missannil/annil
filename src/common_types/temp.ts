// declare const emptyObjectSymbol: unique symbol;

// export type EmptyObject = { [emptyObjectSymbol]?: never };

// export type IsEmptyObject<T> = T extends EmptyObject ? true : false;

// export type _overWriteObjFields<Keys, T> = {
//   // vscode还没有提示 lll有提示可以替换下面一行写法 如:[k in Keys as k extends `${string}.${infer R extends "**" }` ? k : never]: k extends `${infer L}.${infer R}`
//   [
//     k in Keys as k extends `${string}.${infer R}` ? R extends "**" ? never
//       : k
//       : never
//   ]: k extends `${infer L}.${infer R}` ? L extends keyof T ? R extends keyof T[L] ? T[L][R]
//       : never
//     : never
//     : never;
// };

// /**
//  * 增加值为对象的key,值为unknown 不支持深度
//  */
// export type _SetDataField<T> =
//   // 保证原始的
//   & { [k in keyof T]: T[k] }
//   & {
//     // 值为对象的key，加入key.xxx字段 = unknown 再重写，在一次索引字段中，无法获取as的字段泛型变量已再4.6修复。
//     [
//       k in keyof T as T[k] extends unknown[] ? never
//         : T[k] extends object ? `${k & string}.${keyof T[k] & string}`
//         : never
//     ]: unknown;
//   };

// /** */
// export type Flat<TData extends object> = _SetDataField<TData> & _overWriteObjFields<keyof _SetDataField<TData>, TData>;
// export type NonArrNonFuncObject = Record<PropertyKey, unknown>;

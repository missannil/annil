/**
 * 将对象 T 的所有属性名添加前缀 TPrefix。
 * 如果 TPrefix 为空字符串，则返回原对象 T。
 * @param T - 要添加前缀的对象。
 * @param TPrefix - 要添加的前缀。
 * @returns  添加前缀后的新对象或原对象。
 */
export type AddPrefix<T extends object, TPrefix extends string> = "" extends TPrefix ? T : {
  [k in keyof T as `${TPrefix}_${k & string}`]: T[k];
};

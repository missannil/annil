/**
 * 通过as SpecificType 指定具体类型。
 * @remarks
 * 在js中使用构造函数(Object,Array等)表示类型时,无法给出明确的类型,SpecificType为此而生
 * @example
 * ``` ts
 * RootComponent()({
 *   properties: {
 *     gender: String as SpecificType<"male" | "female">,
 *     unionArr: Array as SpecificType<string[] | number[]>,
 *   },
 * });
 * type PropConstructor<T> =
  | { (): T }
  | { new (...args: never[]): T & object }
  | { new (...args: string[]): Function }
 * ```
 */
export type SpecificType<T = unknown> = { (): T } | { new(...arg: any[]): T };

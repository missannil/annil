/**
 * 通过as DetailedType 指定具体类型。
 * @remarks
 * 在js中使用构造函数(Object,Array等)表示类型时,无法给出明确的类型,DetailedType为此而生
 * @example
 * ``` ts
 * RootComponent()({
 *   properties: {
 *     gender: String as DetailedType<"male" | "female">,
 *     unionArr: Array as DetailedType<string[] | number[]>,
 *   },
 * });
 * ```
 */
export type DetailedType<T = unknown> = (() => T) | (new(...arg: unknown[]) => T);

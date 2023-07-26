/**
 * 在使用js构造函数(例如Object)表示类型时,通过as SpecificType<xxx> 指定具体类型。
 * @example
 * ``` ts
 * const user = {
 * 	gender:String as SpecificType<'male'|'female'>
 * }
 * ```
 */
export type SpecificType<T = unknown> = { new(...arg: unknown[]): T } | { (): T };

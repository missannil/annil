/**
 * 判断 A1 是否整体可以赋值给 A2，不对 A1 的联合类型做分发。
 */
export type IfExtends<A1, A2, Then = unknown, Else = A1> = [A1] extends [A2] ? Then : Else;

import type { AddNullForObject } from "../../../types/AddNullForObject";
import type { Getter } from "../../RootComponent/Store/StoreConstraint";

/**
 * 子组件 store 字段约束。
 * @remarks 对象类型允许异步初始化为 null，因此使用 AddNullForObject 包裹返回值类型。
 *   运行时返回 undefined 具有特殊含义，也需要纳入 getter 返回值类型。
 * @returns 为每个合法字段生成可选的 getter，getter 接收属性文档并返回对应字段类型、null 或 undefined。
 */
export type CustomStoreConstraint<
  PropertyDoc extends object,
  legal extends object,
> = {
  [k in keyof legal]?: Getter<PropertyDoc, AddNullForObject<legal[k]> | undefined>;
};

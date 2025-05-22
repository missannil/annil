import type { Getter, WithDefault } from "../../RootComponent/Store/StoreConstraint";

/**
 * 子组件Data字段约束
 * @returns 当剩余对象不为空对象,约束对象的key为剩余key,类型为剩余key对应的文档类型或函数返回类型。
 */
export type CustomStoreConstraint<
  PropertyDoc extends object,
  legal extends object,
> = {
  [k in keyof legal]?: Getter<PropertyDoc, legal[k]> | WithDefault<PropertyDoc, legal[k]>;
};

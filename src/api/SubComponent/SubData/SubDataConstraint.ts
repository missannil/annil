/**
 * 子组件Data字段约束
 * @returns 当剩余对象不为空对象,约束对象的key为剩余key,类型为剩余key对应的文档类型或函数返回类型。
 */
export type SubDataConstraint<
  O extends object,
> = {
  // 加入响应式数据类型
  [k in (keyof O)]?: O[k] | (() => O[k]);
};

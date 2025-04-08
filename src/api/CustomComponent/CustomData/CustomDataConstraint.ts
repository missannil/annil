/**
 * 子组件Data字段约束
 * @returns 当剩余对象不为空对象,约束对象的key为剩余key,类型为剩余key对应的文档类型.
 */
export type CustomDataConstraint<
  TComponentDoc extends object,
> = {
  [k in keyof TComponentDoc]?: TComponentDoc[k];
};

# CustomComponent

`CustomComponent<RootDoc, ComponentDoc, SupplementalPrefix>()({...})` 将已有组件文档接入宿主组件。

## 稳定语义

- 第二个泛型是子组件文档类型，不是运行时组件实例。
- 组件文档中的带前缀属性由 `inherit`、`data`、`store`、`computed` 分工提供。
- `inherit: { key: "rootKey" }` 从 Root 数据映射；数组值表示多个候选 Root 数据；`"wxml"` 表示由模板传值。
- `events` 的 key 和参数由组件文档事件推导。
- 可选的第三泛型用于同一组件多实例时补充前缀。
- 内部字段和方法必须满足当前前缀的类型约束；不要凭经验手写前缀规则。

## 修改或排错

同时读取：

- [实现](../../../../src/api/CustomComponent/index.ts)
- [基础返回类型](../../../../src/api/CustomComponent/returnType.ts)
- [返回类型推导目录](../../../../src/api/CustomComponent/CustomReturnType)
- [文档](../../../../docs/api/custom-component.md)
- [子组件测试](../../../../jest/onlySubComonent)

具体字段问题再进入 `CustomInherit/`、`CustomData/`、`CustomStore/`、`CustomComputed/`、`CustomEvents/` 等目录。

# 扩展能力

## instanceConfig

`instanceConfig.setInjectInfo()` 在 `DefineComponent` 执行前注入公共 `data`、`store`、`methods`、`options` 和 `behaviors`。TypeScript 项目通过模块扩展 `IInjectInfo` 获得实例类型。

读取：

- [实现](../../../../src/api/InstanceInject/instanceConfig.ts)
- [文档](../../../../docs/api/instance-config.md)

## 类型化导航

`navigateTo`、`redirectTo` 使用页面文档约束路径和参数；`navigateBack` 支持返回数据。排错时检查页面 `$Type`、序列化行为和回调栈限制。

读取：

- [实现](../../../../src/api/wxSugar.ts)
- [文档](../../../../docs/api/navigation.md)

## 公共导出

只把 [src/index.ts](../../../../src/index.ts) 实际导出的符号视为公共 API。内部类型即使可通过深路径访问，也不应默认推荐给消费项目。

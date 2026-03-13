# API 总览

Annil 的公开 API 以 `src/index.ts` 导出为准，建议按“组件构建 + 实例注入 + 导航能力 + 类型工具”理解。

## 组件构建

- [DefineComponent](./define-component.md)
- [RootComponent](./root-component.md)
- [CustomComponent](./custom-component.md)
- [ChunkComponent](./chunk-component.md)

## 实例注入

- [instanceConfig](./instance-config.md)

## 常用能力

- [wxSugar](./wx-sugar.md)

## 类型与第三方组件

- `CreateComponentType`
- `ExtendComponentType`
- `Vant / Wm`

## 兼容说明

- 旧文档中的 `SubComponent` 路线保留在 [SubComponent（旧）](./sub-component.md)，用于历史项目兼容参考。

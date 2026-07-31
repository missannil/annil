# 运行时管线

仅在修改或排查 `DefineComponent` 归一化、生命周期、computed、watch、store、注入或内部字段时读取。稳定架构边界以 [Architecture](../../../../docs/maintainers/architecture.md) 为准。

## 入口

`DefineComponent` 调用 `normalizeOptions`，随后调用微信原生 `Component`。页面同样通过 `Component` 注册。

- [DefineComponent](../../../../src/api/DefineComponent/index.ts)
- [normalizeOptions](../../../../src/api/DefineComponent/normalizeOptions/index.ts)

## 归一化顺序

1. 建立最终配置并应用 `instanceConfig` 注入。
2. 合并 Root，再按数组顺序合并 SubComponents。
3. 收集并组合生命周期、watch 和 observers。
4. 检查内部字段冲突，处理页面 `virtualHost`。
5. 处理节流、防抖并把 watch 转为 observers。
6. 追加内部 behaviors。
7. 劫持 `onLoad`、`observers["**"]`、`attached`、`detached`。

- [Root 合并](../../../../src/api/DefineComponent/normalizeOptions/handleRootComponent.ts)
- [SubComponents 合并](../../../../src/api/DefineComponent/normalizeOptions/handleSubComponents.ts)
- [同名函数组合](../../../../src/api/DefineComponent/normalizeOptions/sameFuncOptionsHandle.ts)

## 生命周期顺序

内部 `attached` 前置处理依次为：页面身份检查、页面路径检查、store 初始化、computed 初始化、暂存 observer/watch 回放；之后调用用户 `attached`。`detached` 先释放 store reaction，再调用用户 `detached`。

- [生命周期劫持](../../../../src/api/DefineComponent/normalizeOptions/hijackHandle/index.ts)
- [computed 初始化](../../../../src/api/DefineComponent/normalizeOptions/initComputed/index.ts)
- [watch 转换](../../../../src/api/DefineComponent/normalizeOptions/watchHandler/index.ts)
- [store 注册](../../../../src/api/DefineComponent/normalizeOptions/handleStore/reactionRegister.ts)

调整阶段或生命周期相对顺序属于运行时行为变化，必须读取 Architecture、最近目标测试和对应 API 文档。

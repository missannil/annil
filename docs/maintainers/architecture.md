# Annil Maintainer Architecture

本文只记录维护核心源码时必须保持的架构边界和不变量。API 字段与示例以 `docs/api/` 为准，具体实现以源码和测试为准。

## 1. 系统边界

Annil 是微信小程序原生 `Component` 的 TypeScript 增强层，不建立独立渲染器、虚拟 DOM 或组件实例模型。

系统同时存在两个层面：

- 编译期层：用条件类型、交叉类型、模板字符串类型和 `ThisType` 校验配置并生成组件文档。
- 运行时层：由 `DefineComponent` 将 Root 与 SubComponents 归一化后交给微信原生 `Component`。

页面也通过 `Component` 注册；`isPage`、路径检查和页面生命周期映射共同表达页面语义。

## 2. 组件构建职责

- `RootComponent`：声明宿主的外部属性、公共状态、事件、方法和生命周期。
- `CustomComponent`：用已有组件文档描述宿主如何向 WXML 自定义组件提供数据并处理事件；不创建新的运行时实例。
- `ChunkComponent`：组织当前 WXML 普通片段的局部逻辑；不注册自定义组件，也不生成外部组件文档。
- `DefineComponent`：唯一注册入口，组合配置并生成 `ComponentDoc` 或 `PageDoc` 类型。

改变这些职责边界属于架构变化。

## 3. 类型与运行时有意分离

以下差异不能按普通函数返回值重构：

- Root 和 Custom 在运行时返回配置对象，类型层返回 Definition。
- Chunk 类型返回 `never`，运行时返回配置对象。
- Define 类型返回组件或页面文档，运行时调用原生 `Component`。
- `typeEqual` 只在编译期校验，运行时为空操作。

## 4. 组件文档与前缀

`ComponentDoc` 的属性和事件使用 `组件名_字段名`；`PageDoc` 包含页面路径，页面属性不加组件名前缀。

前缀同时连接：

- TypeScript 组件文档；
- Custom/Chunk 配置；
- WXML 属性和事件；
- `vscode-annil` 静态检查。

Chunk 变量名、泛型前缀和 WXML 根节点 `id` 一致属于工具定位协议，框架运行时不读取该 `id`。改变调用 AST、前缀或文档形状前必须检查外部工具。

## 5. 运行时不变量

归一化的稳定顺序是：注入、Root、SubComponents、同名函数组合、内部检查、watch 转换、内部 behaviors、生命周期劫持。

Root 和 SubComponents 的同名生命周期按收集顺序执行，不是覆盖。SubComponents 顺序来自 `DefineComponent.subComponents`。

内部 `attached` 前置阶段依次完成：

1. 页面身份和路径检查；
2. store 初始化；
3. computed 初始化；
4. 暂存 observer/watch 回放；
5. 用户 `attached`。

store 必须先于 computed；computed 初始化完成前，watch 不能按普通更新处理。`detached` 负责释放 store reaction。

详细源码入口由 Annil Framework Skill 的 Runtime Pipeline reference 提供。

## 6. 全局状态与内部协议

`instanceConfig` 是模块级单例，在 `DefineComponent` 执行时读取。注入先合并，本地配置后合并；普通同名字段由本地配置覆盖，behaviors 追加。

computed 缓存、watch 旧值、暂存处理器、store disposer 和节流防抖状态属于内部协议，不是消费项目扩展点。

新增全局单例、内部状态、behavior 或原生生命周期劫持属于架构变化。

## 7. 导航边界

类型化导航用 `PageDoc` 约束路径和参数。结构化参数经 JSON 与 URI 编码进入查询字段，并由页面加载逻辑恢复。回传使用模块级后进先出回调栈，只覆盖通过 Annil API 建立的返回关系。

改变编码格式、页面接收方式或回调栈语义属于公共运行时变化。

## 8. 更新本文的条件

仅在以下变化发生时更新：

- 四个构建 API 的职责边界变化；
- 组件文档或前缀协议变化；
- runtime pipeline 阶段或生命周期顺序变化；
- 类型返回值与运行时返回值关系变化；
- 新增全局状态、behavior 或原生 API 劫持；
- computed、watch、store 的协作不变量变化。

不改变公共行为和上述边界的局部重构不更新本文。

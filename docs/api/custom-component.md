# CustomComponent

`CustomComponent` 用于在 `DefineComponent` 的 `subComponents` 中声明“组件类型驱动”的子组件配置，是当前替代旧 `SubComponent` 的主方案。

## 适用场景

- 已有组件类型文档（例如 `$TopNav`）并希望接入到页面/组件
- 需要 `inherit`、`data`、`store`、`computed`、`events`、`watch` 的组合能力
- 需要通过前缀或后缀解决字段冲突

## 核心特性

- 高阶函数调用（两次调用）
- 支持组件类型约束与缺失必传字段检测
- 支持与 `RootComponent` 数据、方法、事件的类型联动
- 支持 `CustomWatch`、`CustomPageLifetimes`、`CustomLifetimes`

## 基础示例

```ts
import { CustomComponent } from "annil";
import type { $TopNav } from "path/to/top-nav";

type Root = typeof rootComponent;

const topNav = CustomComponent<Root, $TopNav>()({
  inherit: {
    topNav_title: "title",
  },
  events: {
    topNav_tap() {
      this.onHeaderTap();
    },
  },
});
```

## 与旧 SubComponent 的关系

- 新项目建议优先使用 `CustomComponent` 与 `ChunkComponent`
- 历史 `SubComponent` 文档仅保留用于迁移参考

## 参考

- 源码入口：[src/api/CustomComponent/index.ts](https://github.com/missannil/annil/blob/main/src/api/CustomComponent/index.ts)

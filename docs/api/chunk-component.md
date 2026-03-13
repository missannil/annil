# ChunkComponent

`ChunkComponent` 用于按“片段（chunk）”组织子逻辑，适合在大页面中做模块化拆分。

## 适用场景

- 一个页面需要按业务块拆分（列表块、筛选块、卡片块）
- 希望每个块拥有独立 `data/computed/store/watch/events/methods`
- 希望通过前缀保证字段隔离

## 核心特性

- 泛型入参带前缀：`ChunkComponent<Root, 'prefix'>()`
- 支持 `ChunkData`、`ChunkStore`、`ChunkComputed`、`ChunkWatch`
- 支持与根组件 `pageLifetimes/lifetimes/observers` 协同

## 基础示例

```ts
import { ChunkComponent } from "annil";

type Root = typeof rootComponent;

const listChunk = ChunkComponent<Root, "list">()({
  data: {
    list_loading: false,
  },
  methods: {
    list_reload() {
      this.setData({ list_loading: true });
    },
  },
});
```

## 参考

- 源码入口：[src/api/ChunkComponent/index.ts](https://github.com/missannil/annil/blob/main/src/api/ChunkComponent/index.ts)

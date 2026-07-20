# DefineComponent

`DefineComponent` 是组件构建入口函数，通常与 `RootComponent`、`CustomComponent` 搭配使用。

## 示例 A：构建组件(CompA)

```ts
import { DefineComponent, RootComponent, typeEqual } from "annil";

const rootComponent = RootComponent()({
  isPage: false, // 或不写 isPage
  properties: {
    num: Number,
  },
  // ...
});
const compA = DefineComponent({
  name: "compA",
  rootComponent,
  subComponents: [], // 无子组件可省略
});
// 定义组件类型
export type $CompA = {
  properties: {
    compA_num: number;
  };
};
// 验证组件类型
typeEqual<$CompA>()(compA);
```

## 示例 B：构建页面(IndexPage)

```ts
import {
  CustomComponent,
  DefineComponent,
  RootComponent,
  typeEqual,
} from "annil";
import type { $CompA } from "../components/compA";
const customA = CustomComponent<Root, $CompA>()({
  computed: {
    compA_num() {
      return this.data.num + 1;
    },
  },
});

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    num: {
      type: Number,
      value: 0,
    },
  },
  // ...
});
type Root = typeof rootComponent;

const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [customA],
});

export type $Index = {
  path: "/pages/index/index";
  properties: {
    num?: number;
  };
};

typeEqual<$Index>()(index);
```

## 组件文档类型与 typeEqual

`DefineComponent` 的返回类型（`ComponentDoc` / `PageDoc`）是**带前缀**的内部类型，适合在 `CustomComponent` 中按前缀引用。而导出的 `$CompA` / `$Index` 是**不带前缀**的文档类型，方便外部阅读和使用。

两者之间通过 `typeEqual` 验证一致性：

```ts
const compA = DefineComponent({ name: "compA", rootComponent /*...*/ });

// ❌ 不推荐：typeof 在组件层数过深或递归时会导致编译极慢甚至报错
export type $CompA = typeof compA;

// ✅ 推荐：手动声明清晰可读的文档类型，再用 typeEqual 验证
export type $CompA = {
  properties: { compA_num: number };
};
typeEqual<$CompA>()(compA);
```

`typeEqual` 的原理是当两个类型不匹配时产生**类型报错**，从而保证文档类型和实际组件返回值始终保持同步。结合代码片段支持，多出的几行不会带来额外负担。

## 字段说明

1. `rootComponent`

- 类型 [RootComponentDefinition](https://github.com/missannil/annil/blob/main/src/api/RootComponent/returnType.ts)
- **可选**。

2. `path` / `name`

- 类型 [NameOrPathOption](https://github.com/missannil/annil/blob/main/src/api/DefineComponent/NameOrPath/NameOrPathOption.ts)
- 当 `rootComponent.isPage === true` 时，使用 `path`，类型为 `/${string}`。
- 当 `rootComponent.isPage` 不存在或为 `false` 时，使用 `name`，类型为非空且不包含下划线和空格的字符串。

3. `subComponents`

- 类型为 `CustomComponent` 或 `ChunkComponent` 的配置数组。
- **可选**。

## 返回类型

`DefineComponent` 的返回类型取决于 `rootComponent.isPage`：

- **`isPage` 不为 `true`** → 返回 `ComponentDoc`（组件文档）
- **`isPage` 为 `true`** → 返回 `PageDoc`（页面文档）

### ComponentDoc（组件文档）

```ts
type ComponentDoc = {
  properties?: Record<`${组件名}_${string}`, unknown>;
  events?: Record<`${组件名}_${string}`, unknown>;
};
```

`ComponentDoc` 中所有 key 都会自动加上 **组件名前缀**（即 `name` 字段的值），用于在父组件的 `CustomComponent` 中通过前缀引用：

| 来源                             | 输出字段     | key 格式         |
| -------------------------------- | ------------ | ---------------- |
| `rootComponent.properties`       | `properties` | `组件名_属性Key` |
| `rootComponent.customEvents`     | `events`     | `组件名_事件Key` |
| `subComponents[].composedEvents` | `events`     | `组件名_事件Key` |

::: tip `properties` vs `events`

- `properties` 来自 `rootComponent` 的 properties 定义;
- `events` 由 `rootComponent.customEvents` 与所有 `subComponents` 的 `composedEvents` **合并**而成;
- 二者互不干扰：只有 `properties` 时 `events` 不存在;只有 `events` 时 `properties` 不存在;
- 二者都有时同时存在。
  :::

### composed 事件自动排除

该行为仅适用于子组件的 **composed（穿透）** 事件。只有带 `Composed` 标签的子组件事件（如 `BubblesComposed`、`CaptureComposed`），父组件的 `events` 才会生成 `_catch` 后缀的处理器名。

当父组件在 `events` 中声明了 `_catch` 后缀的处理器后，`DefineComponent` 生成返回类型时会**自动排除**对应的非 catch 事件，使其不再对外暴露。

例如，子组件 `compA` 有一个 `BubblesComposed` 类型的 `tap` 事件：

```ts
// 子组件 compA: tap 事件带有 Bubbles | Composed 标签
RootComponent()({
  customEvents: {
    tap: {
      detail: String,
      options: { bubbles: true, composed: true },
    },
  },
});
```

父组件声明了 `_catch` 处理器后，`tap` 从输出的 `events` 中移除；不加 `_catch` 则保留：

```ts
// 父组件
RootComponent<[typeof compADoc]>()({
  events: {
    compA_tap_bubbles: handler, // ✅ 不加 catch，tap 继续对外暴露
    compA_tap_bubbles_catch: handler, // 加了 catch → tap 从 events 输出中排除
  },
});
```

::: tip 注意

- 纯冒泡事件（`Bubbles`，无 `Composed`）**不会**生成 `_catch` 后缀，因此不受此排除逻辑影响。
- 本组件自身的 `customEvents` 不受影响，仅影响子组件的 composed 事件。
  :::

原理：`GetStopKeys` 从 `TRootDoc["events"]` 中提取 `_catch` 后缀 key 的事件基名（如 `compA_tap_bubbles_catch` → `tap`），再通过 `Omit` 将基名从 `AllEventsDoc`（`customEvents` + 子组件 `composedEvents` 的合并结果）中移除。

### PageDoc（页面文档）

```ts
type PageDoc = {
  path: `/${string}`;
  properties?: TRootDoc["properties"]; // rootComponent 的 properties（无前缀）
};
```

页面文档不包含 `events`，`properties` 不带前缀（页面不需要被其他组件引用）。

## 运行时行为

`DefineComponent` 最终会将所有配置（`rootComponent` + `subComponents`）合并转换为微信原生 [`Component`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html) 构造器的参数并调用。主要处理包括：

- 合并 `rootComponent` 和 `subComponents` 中的 `data`、`methods`、`computed`、`watch`、`observers`、`lifetimes`、`pageLifetimes` 等字段
- 自动注入内置 behavior（事件节流/防抖、组件创建前置钩子等）
- 页面组件的 `options.virtualHost` 会被自动移除
- 内部字段（如 `__storeInited__`）与用户自定义字段冲突时会报错

## 参考

- 源码导出：[src/api/DefineComponent/index.ts](https://github.com/missannil/annil/blob/main/src/api/DefineComponent/index.ts)

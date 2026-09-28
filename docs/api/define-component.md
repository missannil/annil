# DefineComponent

`DefineComponent` 是组件构建核心函数，通常与 `RootComponent`、`CustomComponent` 搭配使用,返回类型为组件类型/页面类型.

:::tip
运行时 `DefineComponent` 会在内部调用原生小程序 `Component`,并将 `rootComponent`(根组件定义) 与 `subComponents`(子组件定义列表)字段整合后的定义作为参数传入。
:::

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

## 示例 A：构建组件(CompA)

```ts
import { DefineComponent, RootComponent, typeEqual } from "annil";

const rootComponent = RootComponent()({
  isPage: false, // 可省略，默认为 false
  properties: {
    num: Number,
  },
  // ...
});
// 定义组件 CompA
const compA = DefineComponent({
  name: "compA",
  rootComponent,
  subComponents: [], // 无子组件可省略
});
// 预期的组件类型
export type $CompA = {
  properties: {
    compA_num: number;
  };
};
// 验证实际类型是否与预期类型一致
typeEqual<$CompA>()(compA);
```

## 示例 B：构建页面(组件CompA作为子组件)

```ts
import {
  CustomComponent,
  DefineComponent,
  RootComponent,
  typeEqual,
} from "annil";
import type { $CompA } from "path/compA";
const compA = CustomComponent<Root, $CompA>()({
  computed: {
    compA_num() {
      return this.data.num + 1;
    },
  },
});

const rootComponent = RootComponent()({
  isPage: true, // true 表示这是一个页面组件
  properties: {
    num: {
      type: Number,
      value: 0,
    },
  },
  // ...
});
// 根组件类型
type Root = typeof rootComponent;

// 定义页面组件 Index
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [compA],
});

// 预期的页面组件类型
export type $Index = {
  path: "/pages/index/index";
  properties: {
    num?: number; // 选传属性
  };
};

// 验证实际类型是否与预期类型一致
typeEqual<$Index>()(index);
```

## 组件文档类型与 typeEqual

`DefineComponent` 的返回类型（`ComponentDoc` / `PageDoc`）是**带前缀**的内部类型，适合在 `CustomComponent` 中按前缀引用。而导出的 `$CompA` / `$Index` 是**不带前缀**的文档类型，方便外部阅读和使用。

两者之间通过 `typeEqual` 验证一致性：

```ts
const compA = DefineComponent({ name: "compA", rootComponent /*...*/ });

// 组件结构简单时，可以直接使用 typeof 获取文档类型
export type $CompA = typeof compA;
```

当组件嵌套较深、类型递归导致编译变慢时，可改为手动声明文档类型，再用 `typeEqual` 验证：

```ts
export type $CompA = {
  properties: { compA_num: number };
};
typeEqual<$CompA>()(compA);
```

`typeEqual` 会在两个类型不匹配时产生**类型报错**，从而保证手动声明的文档类型和实际组件返回值保持同步。简单组件可直接导出 `typeof` 结果；对外维护稳定文档类型或遇到深层组件图的类型性能问题时，可手动声明并用 `typeEqual` 校验。两种写法二选一即可。

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

子组件的 **composed（穿透）** 事件会根据传播方向生成带后缀的 `events` 字段。对于带冒泡阶段的 composed 事件（`BubblesComposed`、`BubblesCaptureComposed`），父组件可在 `events` 中使用 `_bubbles_catch` 或 `_bubblesCapture_catch` 字段捕获事件并阻止它继续向上冒泡。纯捕获事件 `CaptureComposed` 则使用 `_capture_catch` 字段；捕获方向是从父级向下，因此它不会触发下述“从组件文档中排除”的规则。

**类型层面的排除规则**：当父组件声明了冒泡阶段的 catch 字段（`_bubbles_catch` 或 `_bubblesCapture_catch`）后，`DefineComponent` 生成的组件文档会排除对应的 composed 事件，避免该事件类型继续向上层组件传播。纯捕获阶段的 `_capture_catch` 不会排除事件类型。这里的“排除”仅指生成的组件文档类型，不表示删除父组件 `events` 配置中的事件字段。

例如，子组件 `compA` 有一个 `BubblesComposed` 类型的 `tap` 事件。父组件使用 `compA_tap_bubbles_catch` 字段后，生成的父组件文档不再包含 `tap` 事件；若使用普通的 `compA_tap_bubbles` 字段，则事件类型继续对外暴露：

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

```ts
// 父组件
RootComponent<[typeof compADoc]>()({
  events: {
    compA_tap_bubbles_catch(e) {}, // tap 不再出现在生成的组件文档中
  },
});
```

不使用 catch 字段时，事件类型会继续对外暴露：

```ts
RootComponent<[typeof compADoc]>()({
  events: {
    compA_tap_bubbles(e) {}, // tap 继续出现在生成的组件文档中
  },
});
```

::: tip 注意

- 纯冒泡事件（`Bubbles`，无 `Composed`）**不会**生成 catch 字段，因此不受此排除规则影响。
- `CaptureComposed` 对应的 `_capture_catch` 不会排除事件类型；`BubblesCaptureComposed` 的 `_bubblesCapture_catch` 包含冒泡阶段，会排除对应事件类型。
- catch 排除仅应用于子组件的 `composedEvents`；即使本组件的 `customEvents` 与被 catch 的子组件事件同名，本组件事件仍保留在生成文档中。
  :::

实现上，`GetStopKeys` 从 `TRootDoc["events"]` 中提取冒泡阶段 catch 字段对应的事件名（如 `compA_tap_bubbles_catch` → `tap`），并仅从子组件 `composedEvents` 中移除该事件；之后再与本组件 `customEvents` 合并。纯 `_capture_catch` 字段不参与提取。

### PageDoc（页面文档）

页面文档是否包含 `properties`，由根组件是否声明 `properties` 决定：声明时，生成的页面文档要求 `properties` 对象存在；未声明时，生成文档不包含该字段。`properties` 对象内部的字段是否可选，则仍由各属性自身的定义决定。

```ts
// rootComponent 声明了 properties 时
type PageDocWithProperties<TProperties> = {
  path: `/${string}`;
  properties: TProperties; // 对象本身必需，内部属性仍可按定义选传
};

// rootComponent 未声明 properties 时
type PageDocWithoutProperties = {
  path: `/${string}`;
};
```

与组件文档不同，页面文档只描述页面路径和页面接收的 `properties`，不会生成供父组件引用的 `events` 文档。页面的 `properties` 字段名沿用根组件中的名称，不会像组件文档那样加上组件名前缀。

这里的 `properties` 是页面文档类型中描述“页面接收哪些参数”的字段，不代表调用 `navigateTo` 时一定要传 `data`。例如，页面的 `num` 属性设置了默认值，生成的页面文档会是 `{ properties: { num?: number } }`：文档包含 `properties`，但没有必传属性，因此跳转时可以不传 `data`；若传入 `data`，其中的 `num` 也可以省略。

```ts
import { navigateTo } from "annil";
import type { $Index } from "path/to/index";

// $Index 对应上面的页面文档类型
navigateTo<$Index>({ url: "/pages/index/index" });

navigateTo<$Index>({
  url: "/pages/index/index",
  data: {}, // num 有默认值，可以省略
});
```

## 运行时行为

`DefineComponent` 最终会将所有配置（`rootComponent` + `subComponents`）合并转换为微信原生 [`Component`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html) 构造器的参数并调用。主要处理包括：

- 合并 `rootComponent` 和 `subComponents` 中的 `data`、`methods`、`computed`、`watch`、`observers`、`lifetimes`、`pageLifetimes` 等字段
- 自动注入内置 behavior（事件节流/防抖、组件创建前置钩子等）
- 页面组件的 `options.virtualHost` 会被自动移除
- 内部字段（如 `__storeInited__`）与用户自定义字段冲突时会报错

## 参考

- 源码导出：[src/api/DefineComponent/index.ts](https://github.com/missannil/annil/blob/main/src/api/DefineComponent/index.ts)

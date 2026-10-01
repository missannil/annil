# ChunkComponent

`ChunkComponent` 用于为 WXML 中**非自定义组件**的一段结构集中声明数据和逻辑。当某个 `view`、`block` 等片段不值得拆成独立组件，但仍需要独立管理状态、计算属性和事件时，可将其定义为 Chunk，并加入 `DefineComponent` 的 `subComponents`。

它不会创建新的微信组件实例；`DefineComponent` 会把 Chunk 的配置与根组件及其他子组件配置合并为同一个原生 `Component` 配置。

::: warning 高阶函数
与 `RootComponent` 和 `CustomComponent` 一样，`ChunkComponent` 需要调用两次：

```ts
// 第一次调用：传入宿主 RootComponent 类型和可选前缀
// 第二次调用：传入 Chunk 配置
ChunkComponent<RootDoc, "chunkPrefix">()({/* options */});
```

:::

## 函数签名

```ts
function ChunkComponent<
  TRootDoc extends RootComponentDefinition,
  Prefix extends string = "",
>(): (options: Options) => never;
```

返回值在类型层面为 `never`，但运行时会返回传入的配置对象，供 `DefineComponent` 的 `subComponents` 使用。

[源码入口](https://github.com/missannil/annil/blob/main/src/api/ChunkComponent/index.ts)

---

## 泛型参数

| 参数       | 说明                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| `TRootDoc` | 宿主根组件类型，通常传入 `typeof rootComponent`。它让 Chunk 能访问并校验宿主的数据、方法、事件和生命周期。 |
| `Prefix`   | 可选的字段前缀。建议为每个 Chunk 指定唯一前缀，以隔离多个 Chunk 的字段；默认为空字符串，不启用前缀校验。   |

## 快速示例

```ts
import { ChunkComponent, DefineComponent, RootComponent } from "annil";

const rootComponent = RootComponent()({
  data: {
    count: 0,
  },
  methods: {
    increase() {
      this.setData({ count: this.data.count + 1 });
    },
  },
});

type Root = typeof rootComponent;

const counter = ChunkComponent<Root, "counter">()({
  data: {
    counter_title: "计数器",
  },
  computed: {
    counter_display(): string {
      return `${this.data.counter_title}：${this.data.count}`;
    },
  },
  events: {
    counter_onTap() {
      this.increase();
    },
  },
});

DefineComponent({
  name: "example",
  rootComponent,
  subComponents: [counter],
});
```

在同一组件的 WXML 中直接使用 Chunk 的字段和事件：

```xml
<view id="counter" bind:tap="counter_onTap">{{counter_display}}</view>
```

::: warning WXML 根节点 id 必填
每个 Chunk 在 WXML 中都应有一个对应的节点 `id`，并且它必须能对应到以下名称：

1. TypeScript 中接收 `ChunkComponent` 返回值的变量名；
2. `ChunkComponent` 的第二个泛型参数（`Prefix`）；
3. 对应 WXML 节点 `id` 中稳定的名称部分。

静态 `id` 直接写名称；动态 `id` 将 WXML 动态变量放在前面，并保留 `_名称` 后缀。静态和动态写法例如：

```ts
const counter = ChunkComponent<Root, "counter">()({
  // ...
});
```

```xml
<!-- 静态 id：id 名称与 Chunk 变量名、Prefix 一致 -->
<view id="counter">
  <!-- 使用 counter_ 前缀的数据和事件 -->
</view>

<!-- 动态 id：动态变量后保留 _counter，稳定后缀仍与 Chunk 对应 -->
<view id="${{index}}_counter">
  <!-- 使用 counter_ 前缀的数据和事件 -->
</view>
```

动态形式中的 `${{index}}` 表示动态值，`_counter` 是稳定名称后缀；例如列表中每个 `customBtn` Chunk 可写为 `id="${{index}}_customBtn"`。不要把动态表达式放到稳定名称后缀之后，也不要省略后缀。`vscode-annil` 等静态分析工具可据此定位 Chunk 配置并检查 WXML 字段和事件；具体识别能力以所用工具版本为准。`id` 不会被 Annil 运行时读取，此命名规则是 Chunk 的 WXML 编写与工具识别约定。
:::

## 配置字段

| 字段                            | 说明                           | 必填 |
| ------------------------------- | ------------------------------ | ---- |
| [data](#data)                   | Chunk 的本地数据               | 否   |
| [store](#store)                 | MobX 响应式数据映射            | 否   |
| [computed](#computed)           | 计算属性                       | 否   |
| [events](#events)               | WXML 事件处理函数              | 否   |
| [methods](#methods)             | 可复用逻辑方法                 | 否   |
| [watch](#watch)                 | 数据监听                       | 否   |
| [observers](#observers)         | 原生 `observers`               | 否   |
| [pageLifetimes](#pagelifetimes) | 页面生命周期                   | 否   |
| [lifetimes](#lifetimes)         | 组件生命周期                   | 否   |
| 其他原生字段                    | `WMCompOtherOption` 的部分字段 | 否   |

### data

定义 Chunk 数据。启用 `Prefix` 后，字段必须以 `${Prefix}_` 或 `_${Prefix}_` 开头；后者适合内部字段。

`data` 字段不能与宿主组件的 `properties`、`data`、`store`、`computed` 字段重复；这些冲突会由类型约束检查。不同 Chunk 之间没有通用的跨 Chunk 重名检查，因此应使用不同前缀并确保生成的完整字段名不重复。

```ts
const toolbar = ChunkComponent<Root, "toolbar">()({
  data: {
    toolbar_visible: true,
    _toolbar_initialized: false,
  },
});
```

### store

将 MobX 响应式数据映射为 Chunk 字段。getter 会在依赖变化时自动更新宿主实例的数据；其返回值不能为 `undefined`。字段命名和重复校验规则与 `data` 相同。

```ts
const userInfo = ChunkComponent<Root, "userInfo">()({
  store: {
    userInfo_name: () => userStore.name,
  },
});
```

### computed

定义计算属性。函数内通过 `this.data` 读取宿主和 Chunk 的数据，依赖变化时会重新计算。计算字段不能与宿主、`data` 或 `store` 字段重名；建议显式标注返回类型。

```ts
const toolbar = ChunkComponent<Root, "toolbar">()({
  computed: {
    toolbar_disabled(): boolean {
      return this.data.count <= 0;
    },
  },
});
```

### events

定义供 WXML 绑定的事件处理函数。事件会合并为宿主组件的方法，因此可以直接绑定到相同名称：

```ts
const toolbar = ChunkComponent<Root, "toolbar">()({
  events: {
    toolbar_onTap(e) {
      // e 的默认类型为 WMBaseEvent
      this.increase();
    },
  },
});
```

Chunk 的 `events` 中可以调用根组件 `methods` 和 `customEvents` 对应的方法；根组件原生 `events` 仍不能通过 `this` 调用。

```xml
<button bind:tap="toolbar_onTap">增加</button>
```

启用 `Prefix` 时，事件名必须以 `${Prefix}_` 开头。事件名不能与宿主的 `methods`、`events` 或其他 Chunk 的同名字段冲突。

### methods

定义 Chunk 内可复用的方法，可由 `events`、生命周期和其他方法调用。启用 `Prefix` 时，方法名必须以 `${Prefix}_` 开头，且不能与宿主方法、宿主事件或当前 Chunk 的事件重名。

```ts
const toolbar = ChunkComponent<Root, "toolbar">()({
  methods: {
    toolbar_reset() {
      this.setData({ count: 0 });
    },
  },
  events: {
    toolbar_onReset() {
      this.toolbar_reset();
    },
  },
});
```

### watch

监听 Chunk 的 `data`、`store`、`computed` 字段，以及宿主的 `properties`、`data`、`store`、`computed` 字段。回调参数会根据所监听字段自动推导为 `(newValue, oldValue)`。

```ts
const toolbar = ChunkComponent<Root, "toolbar">()({
  watch: {
    count(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
});
```

### observers

原生 `observers` 配置，与微信小程序行为一致。通常优先使用 `watch`，因为 `watch` 可推导新旧值类型。

### pageLifetimes

页面生命周期随宿主根组件的 `isPage` 推导：

- 宿主为页面（`isPage: true`）时，可使用 `onLoad`、`onShow` 等页面生命周期；`onLoad` 的参数类型由页面 `properties` 推导。
- 宿主为组件时，可使用 `show`、`hide`、`resize` 等组件页面生命周期。

### lifetimes

组件生命周期配置，与宿主的 `lifetimes` 一并合并。支持 `beforeCreate`、`created`、`attached`、`ready`、`detached` 等生命周期。

## 命名与冲突规则

`Prefix` 用于约束 Chunk 字段的命名空间，不会自动根据变量名推导。为减少多个逻辑片段之间的字段冲突，建议每个 Chunk 显式使用不同前缀，并确保最终字段名不重叠。注意，前缀不同本身并不保证字段名绝不重叠：例如 `"filter"` 的内部字段 `_filter_cache` 与 `"_filter"` 的普通字段 `_filter_cache` 会重名。

```ts
const filter = ChunkComponent<Root, "filter">()({
  data: {
    filter_keyword: "", // data、store、computed：允许
    _filter_cache: [], // data、store、computed：允许
  },
  events: {
    filter_onInput() {}, // events、methods：仅允许 filter_ 开头
  },
  methods: {
    filter_reset() {}, // events、methods：仅允许 filter_ 开头
  },
});
```

| 字段类别                    | 启用 `Prefix = "filter"` 后允许的名称     |
| --------------------------- | ----------------------------------------- |
| `data`、`store`、`computed` | `filter_${string}` 或 `_filter_${string}` |
| `events`、`methods`         | `filter_${string}`                        |

类型约束会检查 Chunk 字段与宿主字段的冲突，以及单个 Chunk 内受约束字段之间的冲突；但不会统一检查不同 Chunk 之间的所有重名字段。多个 Chunk 最终会合并到同一个组件配置中，重名字段可能相互覆盖或造成行为冲突，因此应在不同 Chunk 间保持完整字段名唯一。

此外，`filter` 变量名、`"filter"` 泛型参数与 WXML 节点 `id` 的稳定名称部分必须保持一致：

```xml
<view id="filter">
  <input value="{{filter_keyword}}" bind:input="filter_onInput" />
</view>

<!-- 动态节点也保留 _filter 后缀 -->
<view id="${{index}}_filter">
  <input value="{{filter_keyword}}" bind:input="filter_onInput" />
</view>
```

## 与 CustomComponent 的选择

| 场景                                           | 建议 API          |
| ---------------------------------------------- | ----------------- |
| 需要注册、复用或独立渲染的自定义组件           | `CustomComponent` |
| 仅为当前组件 WXML 内普通元素片段整理状态和逻辑 | `ChunkComponent`  |

`ChunkComponent` 不产生组件文档类型，也不需要配置 `usingComponents`；它只组织当前组件内部的逻辑。

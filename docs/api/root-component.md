# RootComponent

`RootComponent` 是 annil 的核心构建函数，负责定义组件或页面的主状态与主逻辑。与 `DefineComponent` 搭配使用，可进一步接收 `CustomComponent` / `ChunkComponent` 作为子组件，实现复杂页面的拆分。

它在原生 `Component` 选项基础上扩展了 `computed`、`watch`、`store`、`customEvents` 等能力，同时保留对原生所有选项的完整兼容。

::: warning 高阶函数
为支持外部泛型（`events` 字段的子组件类型约束），`RootComponent` 需调用两次：

```ts
// 第一次调用：传入子组件类型列表（可省略，默认为空数组）
// 第二次调用：传入配置选项
RootComponent<[ComponentDocA, ComponentDocB]>()({/* options */});
```

无子组件事件时，直接 `RootComponent()({ /* options */ })` 即可。
:::

## 函数签名

```ts
function RootComponent<
  TComponentDocList extends ComponentDoc[] = [],
>(): (options: RootComponentOptions) => RootComponentDefinition;
```

| 泛型参数            | 说明                                                                        |
| ------------------- | --------------------------------------------------------------------------- |
| `TComponentDocList` | 子组件类型列表，用于为 `events` 字段提供子组件事件的类型约束。默认为 `[]`。 |

---

## 配置字段

### isPage

|          |           |
| -------- | --------- |
| 类型     | `boolean` |
| 默认值   | `false`   |
| 是否必填 | 否        |

标识当前构建的是**页面**（`true`）还是**组件**（`false`）。

该字段影响：

- `DefineComponent` 中的入口字段：页面时使用 `path`，组件时使用 `name`。
- `pageLifetimes` 的可用生命周期类型（见下文）。
- `customEvents` 字段：页面时不可用。
- `onLoad` 的参数类型：页面时参数为 `properties` 中定义的字段（去除 `null`）。

```ts
RootComponent()({
  isPage: true,
  pageLifetimes: {
    onLoad(props) {
      // props 类型由 properties 推导
    },
  },
});
```

---

### properties

|          |                                  |
| -------- | -------------------------------- |
| 类型     | `Record<string, PropertyOption>` |
| 是否必填 | 否                               |

定义组件/页面的外部属性，兼容原生写法，并扩展了以下能力：

- **任意类型**：通过 `as DetailedType<T>` 声明精确类型（原生只能用构造函数）。
- **value 类型检测**：`value` 字段类型须与 `type` 声明一致，写错会有类型报错。
- **重复字段检测**：与 `data`、`store`、`computed` 字段存在重名时报错。
- **必传/可选推断**：
  - 简写 → 调用方**必传**，单一类型。
  - 对象写法 + `optionalTypes` → 调用方**必传**，联合类型。
  - 对象写法 + `value` → 调用方**可选传**（有默认值），可同时配合 `optionalTypes`。
- **禁用 `observable`**：请用 `watch` 代替。

```ts
import { DetailedType } from "annil";

RootComponent()({
  properties: {
    // ── 必传：简写（构造函数） ──────────────────────────────
    str: String, // string
    num: Number, // number
    bool: Boolean, // boolean
    arr: Array, // unknown[]
    obj: Object, // object

    // ── 必传：简写 + DetailedType（精确/字面量/联合类型） ──
    gender: String as DetailedType<"male" | "female">, // "male" | "female"
    level: Number as DetailedType<0 | 1 | 2>, // 0 | 1 | 2
    tuple: Array as unknown as DetailedType<[string, number]>, // [string, number]（元组需 as unknown 中转）
    userOrCart: Object as DetailedType<User | Cart>, // User | Cart

    // ── 必传：对象写法 + optionalTypes（跨构造函数联合类型） ──
    idOrAge: {
      type: String,
      optionalTypes: [Number], // string | number
    },
    genderOrLevel: {
      type: String as DetailedType<"male" | "female">,
      optionalTypes: [Number as DetailedType<0 | 1 | 2>], // "male" | "female" | 0 | 1 | 2
    },

    // ── 可选传：对象写法 + value（有默认值） ──────────────────
    theme: { type: String, value: "light" }, // string，可选
    page: { type: Number, value: 1 }, // number，可选
    userInfo: {
      type: Object as DetailedType<User>,
      value: { id: "", age: 0 }, // User，可选
    },
    userOrNull: {
      type: Object as DetailedType<User | null>, // User | null，可选（显式含 null）
      value: null,
    },

    // ── 可选传：对象写法 + value + optionalTypes ──────────────
    mixed: {
      type: String,
      value: "default",
      optionalTypes: [Number], // string | number，可选
    },
  },
});
```

---

### data

|          |          |
| -------- | -------- |
| 类型     | `object` |
| 是否必填 | 否       |

定义组件内部数据，与原生 `data` 完全一致。与 `properties`、`store`、`computed` 存在重名时报错。

---

### store

|          |                                   |
| -------- | --------------------------------- |
| 类型     | `Record<string, (data) => value>` |
| 是否必填 | 否                                |

定义基于 `mobx` 的全局响应式数据映射。store 字段中的 getter 返回值变化时，会自动 `setData` 到实例。

- **返回类型不可包含 `undefined`**（运行时无法区分未初始化与显式 undefined）。
- getter 可接收当前实例的 `properties` + `data` 作为参数（适合依赖属性计算 store）。
- 与 `properties`、`data` 存在重名时报错。
- 实例上提供 `this.disposer`，其中每个 store 字段对应一个 `IReactionDisposer`，可手动取消监听。

```ts
import { userStore } from "../../stores/userStore";

RootComponent()({
  properties: {
    userId: String,
  },
  store: {
    // 简单 getter
    userName: () => userStore.name,
    // 依赖 properties 的 getter
    userInfo: (data) => userStore.users[data.userId],
  },
  lifetimes: {
    detached() {
      // 取消某个 store 字段监听
      this.disposer.userName();
    },
  },
});
```

---

### computed

|          |                               |
| -------- | ----------------------------- |
| 类型     | `Record<string, () => value>` |
| 是否必填 | 否                            |

定义计算属性。计算函数中通过 `this.data` 获取依赖数据，依赖变化（`setData` 触发）后自动重新计算并 `setData`。

- `this.data` 中可访问 `properties`、`data`、`store` 及其他 `computed` 字段。
- `this.data` 是**只读**的（运行时检测），不可直接赋值。
- 计算属性在实例 `attached` 前完成初始化。
- 与 `properties`、`data`、`store` 存在重名时报错。
- 若类型推断出错，可显式标注返回类型。

```ts
RootComponent()({
  data: { count: 1 },
  store: { age: () => userStore.age },
  computed: {
    countPlusOne() {
      return this.data.count + 1;
    },
    agePlusOne() {
      return this.data.age + 1;
    },
  },
});
```

---

### events

|          |                                            |
| -------- | ------------------------------------------ |
| 类型     | `Record<string, (e: WMBaseEvent) => void>` |
| 是否必填 | 否                                         |

定义组件/页面的 wxml 事件处理函数（`bindtap`、`catchtap` 等绑定的方法）。

当 `RootComponent` 传入子组件类型列表时，`events` 字段会提供子组件事件名的类型约束及参数提示。事件名支持后缀修饰：

| 后缀             | 含义                     |
| ---------------- | ------------------------ |
| `_bubbles`       | 子组件冒泡事件           |
| `_capture`       | 子组件捕获事件           |
| `_bubbles_catch` | 冒泡事件，并阻止继续传递 |
| `_capture_catch` | 捕获事件，并阻止继续传递 |

```ts
RootComponent<[ComponentDocA]>()({
  events: {
    // 普通事件，e 类型为 WMBaseEvent
    onTap(e) {},
    // 子组件冒泡事件，e.detail 类型由 ComponentDocA 推导
    itemA_click_bubbles(e) {},
  },
});
```

---

### customEvents

|          |                                                                              |
| -------- | ---------------------------------------------------------------------------- |
| 类型     | `Record<string, DetailedType \| [DetailedType, ...] \| { detail, options }>` |
| 是否必填 | 否                                                                           |
| 可用条件 | `isPage: false`（页面时不可用）                                              |

定义组件对外触发的自定义事件。定义后可在 `methods` 中通过 `this.事件名(detail)` 直接触发，无需手动调用 `triggerEvent`。

- 与 `events` 字段存在重名时报错。
- `options` 支持 `bubbles`、`composed`、`capturePhase` 的任意合法组合。

```ts
RootComponent()({
  customEvents: {
    // detail 类型为 number
    confirm: Number,
    // detail 类型为 "male" | "female" | number
    select: [String as DetailedType<"male" | "female">, Number],
    // 带事件选项
    close: {
      detail: String,
      options: { bubbles: true, composed: true },
    },
  },
  methods: {
    onConfirm() {
      this.confirm(42); // 触发 confirm 事件
      this.select("male"); // 触发 select 事件
    },
  },
});
```

---

### watch

|          |                                                                            |
| -------- | -------------------------------------------------------------------------- |
| 类型     | `Record<string \| "field.**" \| "field.subKey", (newVal, oldVal) => void>` |
| 是否必填 | 否                                                                         |

监听数据字段变化，使用 `JSON.stringify` 深度相等比较（与原生 `observers` 的引用比较不同）。可监听 `properties`、`data`、`store`、`computed` 及注入数据。

- 直接写字段名监听整个字段：`fieldName(newVal, oldVal) {}`。
- 写 `field.subKey` 监听对象一级子字段。
- 写 `field.**` 监听整个对象（回调参数排除 `null`，旧值保留 `null`）。
- 回调支持 `async`。

```ts
RootComponent()({
  data: { count: 0, user: { name: "A", age: 18 } },
  watch: {
    count(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
    "user.name"(newVal, oldVal) {},
    "user.**"(newVal, oldVal) {},
  },
});
```

---

### pageLifetimes

|          |    |
| -------- | -- |
| 是否必填 | 否 |

根据 `isPage` 的值，该字段有两种形态：

**构建组件时（`isPage: false`）**：表示组件所在页面的生命周期，对应原生 `pageLifetimes`，并额外扩展了 `load` 周期（需基础库 `>= 3.0.2`，且组件须为同步组件）。

```ts
RootComponent()({
  pageLifetimes: {
    show() {},
    hide() {},
    resize(size) {},
    load(props) {}, // 扩展，基础库 >= 3.0.2
  },
});
```

**构建页面时（`isPage: true`）**：表示页面生命周期，`onLoad` 的参数类型由 `properties` 推导。

```ts
RootComponent()({
  isPage: true,
  properties: {
    id: String,
  },
  pageLifetimes: {
    onLoad(props) {
      props.id; // 类型为 string（去除 null）
    },
    onShow() {},
    onHide() {},
    onUnload() {},
  },
});
```

---

### lifetimes

扩展了原生 `lifetimes`，增加 `beforeCreate` 周期。该周期在配置对象进入原生 `Component()` 前触发，参数为最终配置对象，可用于运行时修改或调试。

| 周期                    | 说明                                                  |
| ----------------------- | ----------------------------------------------------- |
| `beforeCreate(options)` | annil 扩展，进入 `Component()` 前，参数为最终配置对象 |
| `created`               | 原生，组件实例刚创建                                  |
| `attached`              | 原生，组件进入页面节点树                              |
| `ready`                 | 原生，组件布局完成                                    |
| `detached`              | 原生，组件离开页面节点树                              |
| `moved`                 | 原生，组件在树中移动                                  |
| `error(err)`            | 原生，组件方法抛出错误                                |

```ts
RootComponent()({
  lifetimes: {
    beforeCreate(options) {
      console.log(options); // 最终进入 Component() 的配置
    },
    attached() {},
    detached() {},
  },
});
```

---

### methods

定义实例方法，与原生 `methods` 完全一致。`this` 指向完整实例类型（含 `data`、`setData`、自定义事件触发方法等）。

---

### observers

原生字段，兼容写法与原生一致。**推荐优先使用 `watch`**（支持深度比较和旧值参数）。

---

## 原生兼容字段

以下字段与原生 `Component` 完全一致，直接透传：

`data` · `methods` · `observers` · `behaviors` · `relations` · `externalClasses` · `options` · `export`

---

## 实例属性

在 `methods`、`lifetimes`、`events` 等回调中，`this` 的类型为 `RootComponentInstance`，包含：

| 属性/方法             | 说明                                                                  |
| --------------------- | --------------------------------------------------------------------- |
| `this.data`           | 所有字段的只读快照（`properties` + `data` + `store` + `computed`）    |
| `this.setData(obj)`   | 类型安全的 setData，只允许设置 `data` 字段（不含 `store`/`computed`） |
| `this.disposer`       | 每个 `store` 字段对应一个 `IReactionDisposer`，可手动取消监听         |
| `this.事件名(detail)` | 由 `customEvents` 生成的触发方法                                      |
| 原生实例方法          | `triggerEvent`、`selectComponent`、`createSelectorQuery` 等           |

---

## 完整示例

```ts
import { DefineComponent, DetailedType, RootComponent } from "annil";
import { userStore } from "../../stores/userStore";

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    userId: String,
  },
  data: {
    title: "hello",
  },
  store: {
    userName: () => userStore.name,
    userInfo: (data) => userStore.users[data.userId],
  },
  computed: {
    greeting() {
      return `Hi, ${this.data.userName}`;
    },
  },
  watch: {
    userName(newVal, oldVal) {
      console.log("userName changed:", newVal);
    },
  },
  methods: {
    onButtonTap() {
      this.setData({ title: "world" });
    },
  },
  pageLifetimes: {
    onLoad(props) {
      console.log(props.userId);
    },
  },
  lifetimes: {
    detached() {
      this.disposer.userName();
    },
  },
});

export type Root = typeof rootComponent;

DefineComponent({
  path: "/pages/index/index",
  rootComponent,
});
```

---

## 参考

- 源码：[src/api/RootComponent](https://github.com/missannil/annil/tree/main/src/api/RootComponent)
- 相关 API：[DefineComponent](./define-component.md) · [CustomComponent](./custom-component.md) · [ChunkComponent](./chunk-component.md)

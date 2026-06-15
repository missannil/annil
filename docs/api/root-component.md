# RootComponent

`RootComponent` 用于构建根组件，负责声明组件是否为页面,接收属性(properties)、组件事件(customEvents),公共状态与逻辑。

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
- `pageLifetimes` 的可用生命周期类型,页面时为 `onLoad`...，组件时为 `show`...。
- `customEvents` 字段：页面时不可用。

```ts
RootComponent()({
  isPage: true,
  // ...
});
```

---

### properties

|          |                                  |
| -------- | -------------------------------- |
| 类型     | `Record<string, PropertyOption>` |
| 是否必填 | 否                               |

定义组件/页面的接收的属性（外部传值）。支持以下特性：

- **任意类型**：通过 `as DetailedType<T>` 声明精确类型。
- **类型检测**：
  1. 字段错误
  2. `value` 字段类型须与 `type` 声明一致，写错会有类型报错。

- **必传/可选推断**：
  - 简写 → **必传**，单一类型。
  - 对象写法(`type` + `optionalTypes`) → **必传**，联合类型。
  - 对象写法 如果定义了 `value`字段 → **可选类型**，可同时配合 `optionalTypes`。
- **禁用 `observable`**：请用 `watch` 代替。

```ts
import { DetailedType } from "annil";
type Level = 0 | 1 | 2;
type User = { id: string; age: number };
type Cart = { id: string; total: number };
RootComponent()({
  properties: {
    // ── 必传：简写（构造函数） ──────────────────────────────
    str: String, // string
    num: Number, // number
    bool: Boolean, // boolean
    arr: Array, // unknown[]
    obj: Object, // object

    // ── 必传：简写 + DetailedType ──
    gender: String as DetailedType<"male" | "female">, // "male" | "female"
    level: Number as DetailedType<Level>, // Level
    tuple: Array as unknown as DetailedType<[string, number]>, // [string, number]（元组需 as unknown）
    userOrCart: Object as DetailedType<User | Cart>, // User | Cart

    // ── 必传：对象写法 + optionalTypes（跨构造函数联合类型） ──
    idOrAge: {
      type: String,
      optionalTypes: [Number], // string | number
    },
    genderOrLevel: {
      type: String as DetailedType<"male" | "female">,
      optionalTypes: [Number as DetailedType<Level>], // "male" | "female" | Level
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

|          |                  |
| -------- | ---------------- |
| 类型     | `DataConstraint` |
| 是否必填 | 否               |

定义组件内部数据，与原生 `data` 完全一致。与 `properties`存在重名时报错。

---

### store

|          |                   |
| -------- | ----------------- |
| 类型     | `StoreConstraint` |
| 是否必填 | 否                |

定义基于 `mobx` 的响应式数据映射。store 字段中的 getter 返回值变化时，会自动 `setData` 到实例。

- **返回类型不可包含 `undefined`**（运行时无法区分未初始化与显式 undefined）。
- getter 可接收当前实例的 `properties` + `data` 作为参数。
- 与 `properties`、`data` 存在重名时报错。
- 实例上提供 `this.disposer`，其中每个 store 字段对应一个 `IReactionDisposer`，可手动取消监听。

```ts
import { userStore } from "path/userStore";

RootComponent()({
  properties: {
    userId: String,
  },
  data:{
    ignoredId:'xxx', 
  }
  store: {
    // 简单 getter
    userName: () => userStore.name,
    // 依赖 properties userId 的 getter
    userInfo: (data) => userStore.users[data.userId],
    // 特定字段绑定
    ignored: (data) => {
      const {userId, ignoredId} = data; 
      if(userId===ignoredId) return null;
      return userStore.users[userId];
    },
  },
  lifetimes: {
    detached() {
      // 取消某个 store 字段监听
      this.disposer.userName();
      this.disposer.userInfo();
      this.disposer.ignored();
    },
  },
});
```

---

### computed

|          |                      |
| -------- | -------------------- |
| 类型     | `ComputedConstraint` |
| 是否必填 | 否                   |

定义计算属性。计算属性(函数)中可使用`this`,当使用到`this.data`时会自动收集依赖数据，依赖数据变化后更新实例上计算属性值。

- `this.data` 中可访问 `properties`、`data`、`store` 及其他 `computed` 字段。
- `this.data` 是**只读**的（运行时检测）。
- 计算属性初始化在 `store` 之后, `attached`生命周期前。
- 与 `properties`、`data`、`store` 存在重名时报错。
- 应显式标注返回类型(避免类型推断错误)。
- 可通过this.data.__computedCache__访问计算属性缓存对象.

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
    countPlusAge(): number {
      return this.data.count + this.data.age;
    },
  },
  lifetimes: {
    attached() {
      console.log(this.data.countPlusOne); // 2
      console.log(this.data.agePlusOne); // userStore.age + 1
      console.log(this.data.countPlusAge); // count + age
      console.log(this.data.__computedCache__); // 计算属性缓存
    },
  },
});
```

---

### events

|          |                    |
| -------- | ------------------ |
| 类型     | `EventsConstraint` |
| 是否必填 | 否                 |

声明组件/页面的 wxml 事件处理函数（`bindtap`、`catchtap` 等绑定的方法）。

当 `RootComponent` 传入子组件类型列表时，`events` 字段会提供子组件事件名的类型约束及参数提示。事件名支持后缀修饰：

| 后缀             | 含义                               |
| ---------------- | ---------------------------------- |
| `_bubbles`       | 子组件冒泡事件                     |
| `_capture`       | 子组件捕获事件                     |
| `_bubbles_catch` | 子组件冒泡穿透事件，并阻止继续传递 |

annil 提供了一些内置事件参数类型：WMBaseEvent(默认),Dataset,Mark,Detail,CurrentTargetDataset,TargetDataset...

```ts
RootComponent<[ComponentDocA]>()({
  events: {
    // 普通wxml中定义的事件。
    onTap(e) {e.detail //e 默认为 WMBaseEvent },
    // 子组件冒泡事件。使用Dataset定义事件参数，currentTargetDataset为触发事件的子组件dataset，targetDataset为事件源组件dataset。
    itemA_click_bubbles(e:Dataset<{ currentTargetDataset: number }, { targetDataset: string }, number>) {
        const { currentTargetDataset, targetDataset,detail } = e.detail;
        console.log(currentTargetDataset); // number，子组件dataset
        console.log(targetDataset); // string，事件源组件dataset
        console.log(detail); // number，事件参数
    },
    // 子组件捕获事件。
    itemA_click_capture(e) {},
    // 子组件冒泡穿透事件，阻止继续传递。
    itemA_click_bubbles_catch (e) {},
  },
});
```

---

### customEvents

|          |                               |
| -------- | ----------------------------- |
| 类型     | `CustomEventConstraint`       |
| 是否必填 | 否                            |
| 可用条件 | `isPage: false`（组件时可用） |

定义组件对外触发的自定义事件。通过 `this.事件名(detail)` 调用。

- detail字段 可通过 `DetailedType` 声明精确类型。
- 与 `events` 字段存在重名时报错。
- `options` 支持 `bubbles`、`composed`、`capturePhase` 的任意合法组合。

```ts
RootComponent()({
  customEvents: {
    // detail 类型为 number
    confirm: Number,
    // detail 联合类型 "male" | "female" | number
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

|          |             |
| -------- | ----------- |
| 类型     | WatchOption |
| 是否必填 | 否          |

watch监听数据(包含注入数据)真正变化时(structural比较)触发回调函数,回调参数为`(newVal, oldVal)`。

- 字段写法同原生 `observers`，只是做了深度比较和旧值参数的扩展。

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

**构建组件时（`isPage: false`）**：表示组件所在页面的生命周期，对应原生 `pageLifetimes`。

```ts
RootComponent()({
  pageLifetimes: {
    show() {},
    hide() {},
    resize(size) {},
  },
});
```

**构建页面时（`isPage: true`）**：表示页面生命周期，把原生中应该放在methods中的声明周期移到了pageLifetimes中，`onLoad` 的参数类型由 `properties` 推导。

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

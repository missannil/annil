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

[RootComponent](https://github.com/missannil/annil/blob/main/src/api/RootComponent/index.ts)

---

## 配置字段

| 字段                            | 类型                             | 必填 |
| ------------------------------- | -------------------------------- | ---- |
| [isPage](#ispage)               | `boolean`                        | 否   |
| [properties](#properties)       | `Record<string, PropertyOption>` | 否   |
| [data](#data)                   | `DataConstraint`                 | 否   |
| [store](#store)                 | `StoreConstraint`                | 否   |
| [computed](#computed)           | `ComputedConstraint`             | 否   |
| [events](#events)               | `EventsConstraint`               | 否   |
| [customEvents](#customevents)   | `CustomEventConstraint`          | 否   |
| [watch](#watch)                 | `WatchOption`                    | 否   |
| [pageLifetimes](#pagelifetimes) | —                                | 否   |
| [lifetimes](#lifetimes)         | —                                | 否   |
| [methods](#methods)             | —                                | 否   |
| [observers](#observers)         | —                                | 否   |

### isPage

**描述** 声明组件类型：页面或组件。该字段会影响组件的入口字段、生命周期函数和事件配置。

**类型** `boolean` · **默认值** `false` · **是否必填** 否

该字段影响：

- `DefineComponent` 中的入口字段：页面时使用 `path`，组件时使用 `name`。
- `pageLifetimes` 的可用生命周期类型，页面时为 `onLoad`…，组件时为 `show`…。
- `customEvents` 字段：页面时不可用。

```ts
RootComponent()({
  isPage: true,
  // ...
});
```

### properties

**描述** 定义组件/页面的接收的属性（外部传值）。

**类型** [PropertiesConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Properties/PropertiesConstraint.ts)

**是否必填** 否

**特性**：

- **任意类型**：通过 `as DetailedType<T>` 声明精确类型。
- **必传/可选推断**：简写 → 必传；对象写法 + `value` → 可选；可配合 `optionalTypes` 声明联合类型。
- **禁用 `observable`**：请用 `watch` 代替。

- **类型检测**：字段错误、`value` 与 `type` 不一致会有类型报错。

```ts
import { DetailedType } from "annil";
type Level = 0 | 1 | 2;
type User = { id: string; age: number };

RootComponent()({
  properties: {
    // 必传：简写
    str: String, // string
    num: Number, // number
    bool: Boolean, // boolean
    // 必传：简写 + DetailedType
    gender: String as DetailedType<"male" | "female">, // "male" | "female"
    level: Number as DetailedType<Level>, // Level
    // 必传：对象写法 + optionalTypes
    idOrAge: {
      type: String,
      optionalTypes: [Number],
    },
    // 可选：对象写法 + value
    theme: { type: String, value: "light" }, // string，可选
    userInfo: {
      type: Object as DetailedType<User>,
      value: { id: "", age: 0 },
    },
    // 可选：对象写法 + value + optionalTypes
    mixed: {
      type: String,
      value: "default",
      optionalTypes: [Number],
    },
  },
});
```

### data

**描述** 定义组件内部数据，与原生 `data` 完全一致。与 `properties` 存在重名时报错。

**是否必填** 否

**类型** [DataConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Data/DataConstraint.ts)

### store

**描述** 定义基于 `mobx` 的响应式数据映射。getter 参数为 `properties` 字段初始传值.getter 返回值变化时，会自动 `setData` 到实例。与 `properties`、`data` 存在重名时报错。组件detach时会自动取消监听。重新attach时会重新建立监听。

**是否必填** 否

**类型** [StoreConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Data/StoreConstraint.ts)

::: warning 警告

- 返回值为undefined时,控制台打印警告,该子字段被忽略。

- getter中没有依赖响应式数据时,控制台报错,因为没有意义。

- 实例上提供 `this.disposer`，字段名对应一个 `IReactionDisposer`，可手动取消监听。
  :::

```ts
type Gender = "male" | "female";
type User = { id: string; name: string; age: number; gender: Gender };
const storeUser = observable({
  id: "goddess",
  name: "annil",
  gender: "female",
  age: 23,
} as User);
RootComponent()({
  properties: {
    userId: String,
  },
  store: {
    // 常规写法：getter 直接访问 store 中的响应式数据
    userName: () => storeUser.name,
    // 依赖 properties 的写法：getter 参数为 properties 初始传值
    ignoreField: (props) =>
      storeUser.id === props.userId ? storeUser.age : void 0,
    // 错误示例：getter 中没有依赖响应式数据
    errorField: () => 23,
  },
  lifetimes: {
    attached() {
      // 手动取消监听示例
      this.disposer.userName();
    },
  },
});
```

### computed

**描述** 定义计算属性。函数中可使用组件实例(this),this.data上的字段自动收集为依赖,依赖变化后更新计算属性值。与 `properties`、`data`、`store` 存在重名时报错。

**类型** [ComputedConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Computed/ComputedConstraint.ts)

**是否必填** 否

::: warning 提示

- `this.data` 中可访问 `properties`、`data`、`store` 及其他 `computed` 字段，且为**只读**（运行时检测）。

- 计算属性初始化在 `store` 之后、`attached` 之前。

- 应显式标注返回类型（避免类型推断错误），可通过 `this.data.__computedCache__` 访问缓存。
  :::

```ts
RootComponent()({
  properties: {
    p: {
      type: String,
      value: "hi",
    },
  },
  data:{
    d: 'miss',
  },
  store: {
    s: () => userStore.name,
  },
  computed: {
    // 依赖 properties、data、store 字段
    greeting():string {
      return this.data.p + " " + this.data.d + " " + this.data.s;
    },
    // 依赖其他 computed 字段
    praise():string {
      return this.data.greeting + ", you are so beautiful";
  },
});
```

### events

**描述** 声明 wxml 事件处理函数（`bindtap`、`catchtap` 等）。声明的事件只能由 wxml 触发（类型约束）。当通过泛型传入子组件类型列表时，自动提供子组件冒泡/捕获事件的字段提示与参数类型推断。

**类型** [EventsConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Events/EventsConstraint.ts)

**是否必填** 否

#### 子组件事件后缀

当 `RootComponent` 传入子组件文档泛型时，子组件中标记为冒泡或捕获的事件会自动生成带后缀的事件字段，用于区分事件传递阶段：

| 后缀             | 含义                                         |
| ---------------- | -------------------------------------------- |
| `_bubbles`       | 子组件冒泡事件，事件从子组件向父组件传递     |
| `_bubbles_catch` | 子组件冒泡事件，并在当前组件阻止继续向上传递 |
| `_capture`       | 子组件捕获事件，事件从父组件向子组件传递     |
| `_capture_catch` | 子组件捕获事件，并在当前组件阻止继续向下传递 |

#### 内置事件参数类型

annil 提供了以下类型工具，用于为事件参数 `e` 标注精确类型：

| 类型别名                  | 用途                                             |
| ------------------------- | ------------------------------------------------ |
| `WMBaseEvent`             | 微信原生基础事件类型（默认）                     |
| `WMCustomEvent<D,M,C,T>`  | 完整自定义事件，支持泛型定义各字段               |
| `Detail<T>`               | 仅定义 `e.detail` 的类型                         |
| `Mark<T>`                 | 仅定义 `e.mark` 的类型                           |
| `Dataset<C,T,D>`          | 定义 `currentTarget.dataset` 和 `target.dataset` |
| `CurrentTargetDataset<T>` | 仅定义 `e.currentTarget.dataset` 的类型          |
| `TargetDataset<T>`        | 仅定义 `e.target.dataset` 的类型                 |

#### 示例

##### 1. 无子组件时：事件参数默认为 `WMBaseEvent`

```ts
RootComponent()({
  events: {
    onTap(e) {
      // e 类型为 WMBaseEvent
    },
  },
});
```

##### 2. 无子组件时：使用类型工具定义参数

```ts
import {
  CurrentTargetDataset,
  Detail,
  Mark,
  TargetDataset,
  WMCustomEvent,
} from "annil";

RootComponent()({
  events: {
    // 通过 WMCustomEvent 定义 detail、mark、dataset
    customA(
      e: WMCustomEvent<
        string,
        { markData: { id: string } },
        { data: string },
        { data: number }
      >,
    ) {
      e.detail; // string
      e.mark; // { markData: { id: string } } | undefined
      e.currentTarget.dataset; // { data: string }
      e.target.dataset; // { data: number }
    },
    // 仅定义 detail
    bbb(e: Detail<{ str: string }>) {
      e.detail.str; // string
    },
    // 仅定义 mark
    ccc(e: Mark<{ id: string }>) {
      e.mark.id; // string
    },
    // 仅定义 currentTarget.dataset
    ddd(e: CurrentTargetDataset<{ str: string }>) {
      e.currentTarget.dataset.str; // string
    },
    // 仅定义 target.dataset
    eee(e: TargetDataset<{ str: string }>) {
      e.target.dataset.str; // string
    },
  },
});
```

##### 3. 传入子组件泛型时：子组件冒泡/捕获事件提示

子组件文档中，事件的 detail 类型通过联合 `Bubbles` / `Capture` 标记冒泡或捕获行为：

```ts
import { Bubbles, Capture } from "annil";
import type { CreateComponentDoc } from "annil";

// 子组件 A：aaa_num 为冒泡事件
type ComponentDocA = CreateComponentDoc<"aaa", {
  events: {
    str: string;
    num: number | Bubbles;
  };
}>;

// 子组件 B：bbb_num 为捕获事件
type ComponentDocB = CreateComponentDoc<"bbb", {
  events: {
    str: string;
    num: number | Capture;
  };
}>;

RootComponent<[ComponentDocA, ComponentDocB]>()({
  events: {
    // 3.1 冒泡事件：后缀 _bubbles
    aaa_num_bubbles(e) {
      e.detail; // number
    },
    // 3.2 冒泡事件+阻止传递：后缀 _bubbles_catch
    aaa_num_bubbles_catch(e) {
      e.detail; // number
    },
    // 3.3 捕获事件：后缀 _capture，可配合 Dataset 定义 dataset 类型
    bbb_num_capture(
      e: Dataset<
        { currentTargetDataset: number },
        { targetDataset: string },
        number
      >,
    ) {
      e.detail; // number
      e.currentTarget.dataset.currentTargetDataset; // number
      e.target.dataset.targetDataset; // string
    },
    // 3.4 捕获事件+阻止传递：后缀 _capture_catch
    bbb_num_capture_catch(e) {
      e.detail; // number
    },
  },
});
```

##### 4. 子事件与根组件自身事件共存

```ts
RootComponent<[ComponentDocA, ComponentDocB]>()({
  events: {
    // 根组件自身事件
    rootTap(e) {
      // e 类型为 WMBaseEvent
    },
    // 子组件冒泡事件
    aaa_num_bubbles(e) {
      e.detail; // number
    },
  },
});
```

##### 5. 空事件与无事件字段

`events` 为 `{}` 或未定义时，返回类型中不包含 `events` 字段。

```ts
// events 为 {}，返回类型中无 events
const Empty = RootComponent<[ComponentDocA]>()({ events: {} });
// 无 events 字段，返回类型中无 events
const NoEvents = RootComponent<[ComponentDocA]>()({});
```

### customEvents

**类型** `CustomEventConstraint` · **是否必填** 否 · **可用条件** `isPage: false`（组件时可用）

定义组件对外触发的自定义事件。声明后可通过 `this.事件名(detail)` 在 `methods` 中调用触发。

**类型** [CustomEventConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/CustomEvents/CustomEventConstraint.ts)

#### 三种配置形式

`customEvents` 支持三种配置形式，用以描述事件参数 `detail` 的类型：

| 形式     | 写法                                                 | 说明                              |
| -------- | ---------------------------------------------------- | --------------------------------- |
| **简写** | `事件名: 构造函数`                                   | detail 为该构造函数对应的基础类型 |
| **联合** | `事件名: [构造函数1, 构造函数2, ...]`                | detail 为所有构造函数的联合类型   |
| **完整** | `事件名: { detail, options?, debounce?, throttle? }` | 可同时配置事件选项与节流防抖      |

##### 简写形式

直接使用 `String`、`Number`、`Boolean`、`Object`、`null`、`undefined` 等构造函数声明 detail 类型。配合 `as DetailedType<T>` 可指定精确字面量类型。

```ts
RootComponent()({
  customEvents: {
    str: String, // detail: string
    num: Number, // detail: number
    bool: Boolean, // detail: boolean
    nothing: undefined, // detail: undefined
    nil: null, // detail: null
    unionStr: String as DetailedType<"male" | "female">, // detail: "male" | "female"
    obj: Object as DetailedType<{ id: string; age: number }>, // detail: { id: string; age: number }
  },
  methods: {
    onTrigger() {
      this.str("hello");
      this.num(42);
      this.unionStr("female");
      this.obj({ id: "001", age: 23 });
    },
  },
});
```

##### 联合形式

传入数组，detail 类型为所有构造函数类型的联合。

```ts
RootComponent()({
  customEvents: {
    union: [String, Number as DetailedType<0 | 1 | 2>, null],
    // detail: string | 0 | 1 | 2 | null
  },
  methods: {
    onTrigger() {
      this.union("text");
      this.union(1);
      this.union(null);
    },
  },
});
```

##### 完整形式

通过对象配置 detail 类型、事件选项（`bubbles` / `capturePhase` / `composed`）及 `debounce` / `throttle`。

```ts
RootComponent()({
  customEvents: {
    // 仅配置 options
    bubbles: {
      detail: String,
      options: { bubbles: true },
    },
    // 配置 options + debounce
    withDebounce: {
      detail: Number,
      options: { bubbles: true, composed: true },
      debounce: 300,
    },
    // 配置 options + throttle
    withThrottle: {
      detail: String as DetailedType<"male" | "female">,
      options: { capturePhase: true },
      throttle: 200,
    },
  },
});
```

#### options 配置

`options` 字段控制微信原生 [`triggerEvent`](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/triggerEvent.html) 的行为，支持以下字段的**任意合法组合**：

| 字段           | 类型   | 说明                                             |
| -------------- | ------ | ------------------------------------------------ |
| `bubbles`      | `true` | 事件是否冒泡                                     |
| `capturePhase` | `true` | 事件是否拥有捕获阶段                             |
| `composed`     | `true` | 事件是否可跨 Shadow DOM 边界（需配合上两项之一） |

::: warning 注意

- `options` 中的字段值**只能为 `true`**，不可设为 `false`（默认即为 `false`）。
- `composed` **不可单独使用**，必须配合 `bubbles` 和/或 `capturePhase` 为 `true`。
- `options` 不可为空对象，如无选项配置请使用简写形式。
- 完整形式中若未配置 `options`，则不可使用对象形式，应改用简写。
  :::

合法组合示例：

```ts
// 每种组合对应一个类型标签，用于事件文档类型推断
{ bubbles: true }                                       // → Bubbles
{ capturePhase: true }                                  // → Capture
{ bubbles: true, capturePhase: true }                   // → BubblesCapture
{ bubbles: true, composed: true }                       // → BubblesComposed
{ capturePhase: true, composed: true }                  // → CaptureComposed
{ bubbles: true, capturePhase: true, composed: true }   // → BubblesCaptureComposed
```

#### 调用方式

在 `methods` 中通过 `this.事件名(detail)` 触发自定义事件。detail 参数的类型由配置自动推导：

```ts
RootComponent()({
  customEvents: {
    confirm: Number,
    select: [String as DetailedType<"male" | "female">, Number],
    close: {
      detail: String,
      options: { bubbles: true, composed: true },
    },
  },
  methods: {
    onConfirm() {
      this.confirm(42); // ✓ 参数类型为 number
      this.select("male"); // ✓ 参数类型为 "male" | "female" | number
      this.close("closed"); // ✓ 参数类型为 string
    },
  },
});
```

#### 类型错误检测

##### 与 `events` 字段重名

`customEvents` 与 `events` 字段存在同名时会报类型错误：

```ts
RootComponent()({
  events: {
    onTap(e) {},
  },
  customEvents: {
    // @ts-expect-error  "⚠️与events字段重复⚠️"
    onTap: String,
  },
});
```

##### options 配置错误

```ts
RootComponent()({
  customEvents: {
    // ❌ 无 options 时不可用对象形式，应简写为 `error1: Boolean`
    error1: { detail: Boolean },
    // ❌ options 不可为空对象
    error2: { detail: Boolean, options: {} },
    // ❌ 不可显式设为 false（默认即为 false）
    error3: { detail: Boolean, options: { bubbles: false } },
    // ❌ composed 不可单独开启
    error4: { detail: Boolean, options: { composed: true } },
    // ❌ options 中非法字段名
    error5: {
      detail: String,
      options: { bubbles: true, compose: true }, // compose 拼写错误
    },
  },
});
```

#### 返回类型

- `customEvents` 为 `{}` 或未定义时，返回类型中**不包含** `customEvents` 字段。
- `customEvents` 非空时，返回类型中包含 `customEvents` 字段，值为以事件名为 key、detail 类型为 value 的对象。若配置了 `options`，value 还会联合对应的标签类型（`Bubbles`、`Capture` 等），用于生成子组件事件文档。

```ts
const rootDef = RootComponent()({
  customEvents: {
    str: String,
    bubbles: {
      detail: Number,
      options: { bubbles: true },
    },
  },
});
// 返回类型中 customEvents 的值为：
// {
//   str: string;
//   bubbles: number | Bubbles;
// }

// events 为 {} → 无 customEvents 字段
const empty = RootComponent()({ customEvents: {} });
// 无 customEvents 字段 → 无 customEvents 字段
const noField = RootComponent()({});
```

### watch

**类型** `WatchOption` · **是否必填** 否

监听所有数据字段（含 `properties`、`data`、`store`、`computed` 及注入数据）的变化。key的规则与observers相同，不同点在于`watch` 只在数据**真正变化**时触发，且回调参数`(newVal, oldVal)`加入了旧值 。

**类型** [WatchOption](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Watch/WatchOption.ts)

#### 示例

```ts
RootComponent()({
  properties: {
    count: Number,
  },
  data: {
    title: "hello",
  },
  store: {
    userName: () => userStore.name,
  },
  computed: {
    greeting(): string {
      return `Hi, ${this.data.userName}`;
    },
  },
  watch: {
    // 监听 properties
    count(newVal, oldVal) {
      console.log("count changed:", newVal, oldVal);
    },
    // 监听 data
    title(newVal, oldVal) {
      console.log("title changed:", newVal);
    },
    // 监听 store 注入字段
    userName(newVal, oldVal) {
      console.log("userName changed:", newVal);
    },
    // 监听 computed 字段（需手动标注类型）
    greeting(newVal: string, oldVal: string) {
      console.log("greeting changed:", newVal);
    },
  },
});
```

##### 监听对象子字段

对于对象类型的字段，支持监听其一级子字段或全部子字段的变化：

```ts
RootComponent()({
  properties: {
    user: {
      type: Object as DetailedType<{ name: string; age: number }>,
      value: { name: "", age: 0 },
    },
  },
  watch: {
    // 仅监听user对象(setData中key为user且值发生变化时)。
    user(newVal, oldVal) {
      console.log("user changed", newVal);
    },
    // 仅监听 user.name 子字段（setData中key为user.name且值发生变化时）
    "user.name"(newVal: string, oldVal: string) {
      console.log("user.name changed", newVal);
    },
    // 监听 user 对象及其所有子字段的变化
    "user.**"(newVal, oldVal) {
      console.log("user.** changed", newVal);
    },
  },
});
```

##### 错误检测

- 无可监控字段时，`watch` 约束为 `EmptyObject`，不可写入任何字段。
- 字段名不在可监控范围内时报错。
- 对象联合 `null` 的类型不可监听子字段（因可能为 `null` 无法安全访问）。

```ts
RootComponent()({
  // ❌ 无可监控字段时报错
  watch: {
    // @ts-expect-error 无可监控字段
    xxx() {},
  },
});

RootComponent()({
  properties: {
    num: Number,
  },
  data: {
    str: "123",
  },
  watch: {
    // @ts-expect-error otherFields 不在可监控字段中
    otherFields() {},
  },
});

// ❌ 对象联合 null 的类型不可监听子字段
RootComponent()({
  properties: {
    user: Object as DetailedType<{ name: string; age: number } | null>,
  },
  watch: {
    // @ts-expect-error user 可能为 null，不能监听子字段
    "user.name"(newVal, oldVal) {},
  },
});
```

::: warning 注意
当某个字段变化时 watch触发比computed更早,如果watch的回调中使用到了该计算属性,则computed的值为变化前的值,如果需要使用变化后的值,应监控计算属性key。

```ts
RootComponent()({
  data: {
    firstName: "伟",
    lastName: "张",
  },
  computed: {
    fullName(): string {
      return `${this.data.firstName} ${this.data.lastName}`;
    },
  },
  watch: {
    firstName(newVal: string, oldVal: string) {
      console.log(newVal, oldVal); // 涛, 伟
      console.log(this.data.fullName); // 伟 张，计算属性变化前的值
      wx.nextTick(() => {
        console.log(this.data.fullName); // 涛 张，计算属性变化后的值
      });
    },
  },
  lifetimes: {
    attached() {
      this.setData({ firstName: "涛" });
    },
  },
});
```

:::

### pageLifetimes

**类型** `PageLifetimesOption` · **是否必填** 否

根据 `isPage` 的值有两种形态：

**类型** [PageLifetimesOption](https://github.com/missannil/annil/blob/main/src/api/RootComponent/PageLifetimes/PageLifetimesOption.ts)

#### 组件时（`isPage: false` / 未设置）

对应原生 `pageLifetimes`，监听组件所在页面的生命周期。

```ts
RootComponent()({
  pageLifetimes: {
    show() {},
    hide() {},
    resize(size: WechatMiniprogram.Page.IResizeOption) {},
  },
});
```

#### 页面时（`isPage: true`）

对应页面生命周期。`onLoad` 的参数类型为 `properties`字段类型。

```ts
RootComponent()({
  isPage: true,
  properties: {
    id: String,
    title: {
      type: String,
      value: "default",
    },
  },
  pageLifetimes: {
    // props 类型为 Required<PropertiesDoc>
    onLoad(props) {
      props.id; // string
      props.title; // string
    },
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onPageScroll(e) {},
    onShareAppMessage() {},
    // ...其他页面生命周期
  },
});
```

#### 错误检测

- 组件时仅允许 `show`、`hide`、`resize`。
- 页面时仅允许页面生命周期（`onLoad`、`onShow` 等）。
- 非法生命周期字段名会报类型错误。

```ts
RootComponent()({
  pageLifetimes: {
    // @ts-expect-error 组件时不存在 xxx 生命周期
    xxx() {},
  },
});

RootComponent()({
  isPage: true,
  pageLifetimes: {
    // @ts-expect-error 页面时不存在 xxx 生命周期
    xxx() {},
  },
});
```

### lifetimes

**类型** `LifetimesConstraint` · **是否必填** 否

扩展了原生的组件生命周期，新增 `beforeCreate` 周期。

**类型** [LifetimesConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Lifetimes/LifetimesConstraint.ts)

| 周期                    | 说明                                                    |
| ----------------------- | ------------------------------------------------------- |
| `beforeCreate(options)` | **annil 扩展**，在配置对象进入原生 `Component()` 前触发 |
| `created`               | 组件实例刚创建                                          |
| `attached`              | 组件进入页面节点树                                      |
| `ready`                 | 组件布局完成                                            |
| `moved`                 | 组件在树中移动                                          |
| `detached`              | 组件离开页面节点树                                      |
| `error(err)`            | 组件方法抛出错误                                        |

- `beforeCreate` 的 `this` 为 `undefined`（此时实例尚未创建）。
- `beforeCreate` 的参数 `options` 为最终进入原生 `Component()` 的配置对象，便于调试。

```ts
RootComponent()({
  lifetimes: {
    beforeCreate(options) {
      // this 为 undefined
      // options 为最终配置对象，可在此时查看修改调试。
      console.log(options);
    },
    created() {
      console.log("组件创建");
    },
    attached() {
      console.log("组件挂载");
    },
    // ...
  },
});
```

#### 错误检测

```ts
RootComponent()({
  lifetimes: {
    // @ts-expect-error 非法的生命周期字段
    xxx() {},
  },
});
```

### methods

**类型** `MethodsConstraint` · **是否必填** 否

定义实例方法。`this` 指向完整实例类型，包含 `data`、`setData`、自定义事件触发方法等所有实例属性。

**类型** [MethodsConstraint](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Methods/MethodsConstraint.ts)

**特性**：

- 方法与 `events` 和 `customEvents` 字段**不可重名**，否则会报类型错误。
- 返回类型会体现在 `RootComponent` 的返回类型中。

```ts
RootComponent()({
  data: {
    count: 0,
  },
  customEvents: {
    customField: String,
  },
  methods: {
    handler() {
      this.setData({ count: this.data.count + 1 });
      this.customField("hello"); // 调用 customEvents 中的事件方法
    },
  },
});
```

#### 错误检测

```ts
RootComponent()({
  events: {
    onTap() {},
  },
  customEvents: {
    onCustom: String,
  },
  methods: {
    handler() {
      this.setData({ count: this.data.count + 1 });
      this.onCustom("hello"); // 调用 customEvents 中的事件方法
    },
    // @ts-expect-error "⚠️与events字段重复⚠️"
    onTap() {},
    // @ts-expect-error "⚠️与customEvents字段重复⚠️"
    onCustom() {},
  },
});
```

### observers

原生字段,加入了完整类型。

**类型** `ObserversOption`

**是否必填** 否

**类型** [ObserversOption](https://github.com/missannil/annil/blob/main/src/api/RootComponent/Observers/ObserversOption.ts)

## 原生兼容字段

以下字段与微信原生 `Component` 完全一致，直接透传：

| 字段              | 说明       |
| ----------------- | ---------- |
| `behaviors`       | 组件行为   |
| `relations`       | 组件间关系 |
| `externalClasses` | 外部样式类 |
| `options`         | 组件选项   |
| `export`          | 组件导出   |

---

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
- 相关 API：[DefineComponent](./define-component.md) · [CustomComponent](./custom-component.md)

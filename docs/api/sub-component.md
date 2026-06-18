# SubComponent

`SubComponent` 用于在 `DefineComponent` 的 `subComponents` 中声明"组件类型驱动"的子组件配置。它将已有组件类型文档（如 `$TopNav`）接入父组件，并提供 `inherit`、`data`、`store`、`computed`、`events`、`watch` 等字段的组合能力。

::: warning 高阶函数
与 `RootComponent` 类似，`SubComponent` 也需调用两次：

```ts
// 第一次调用：传入泛型参数
// 第二次调用：传入配置选项
SubComponent<RootDoc, CompDoc, "Prefix">()({/* options */});
```

:::

## 函数签名

```ts
function SubComponent<
  TRootComponentDefinition extends RootComponentDefinition,
  TCompDoc extends ComponentDoc,
  Prefix extends string = "",
>(): (options: Options) => SubComponentDefinition;
```

[源码入口](https://github.com/missannil/annil/blob/main/src/api/SubComponent/index.ts)

---

## 泛型参数

| 参数                       | 说明                                                     |
| -------------------------- | -------------------------------------------------------- |
| `TRootComponentDefinition` | 父组件类型（`typeof rootComponent`），提供数据与方法联动 |
| `TCompDoc`                 | 子组件文档类型，定义子组件的 `properties` 和 `events`    |
| `Prefix`                   | 可选，额外补充的前缀，用于解决多实例时的字段冲突         |

---

## 配置字段

| 字段                            | 类型                        | 必填 |
| ------------------------------- | --------------------------- | ---- |
| [inherit](#inherit)             | `CustomInheritConstraint`   | 否   |
| [data](#data)                   | `CustomDataConstraint`      | 否   |
| [store](#store)                 | `CustomStoreConstraint`     | 否   |
| [computed](#computed)           | `CustomComputedConstraint`  | 否   |
| [events](#events)               | `CustomEventsConstraint`    | 否   |
| [methods](#methods)             | `CustomMethodsConstraint`   | 否   |
| [watch](#watch)                 | `CustomWatchOption`         | 否   |
| [observers](#observers)         | `CustomObserversOption`     | 否   |
| [pageLifetimes](#pagelifetimes) | `CustomPageLifetimesOption` | 否   |
| [lifetimes](#lifetimes)         | `CustomLifetimesOption`     | 否   |

---

### inherit

**描述** 声明子组件数据从何而来，可以来自根组件也可以来自 wxml 模板。被 `inherit` 声明的字段不允许在 `data`、`store`、`computed` 中重复声明。

**类型** `CustomInheritConstraint` · **是否必填** 否

每个 key 为子组件文档 `properties` 中的字段名，value 为以下之一：

| value 写法   | 含义                                                            |
| ------------ | --------------------------------------------------------------- |
| `"字段名"`   | 从根组件数据中获取同名/同类型的字段值                           |
| `"字段名"[]` | 从根组件数据中获取多个字段的值（取类型并集）                    |
| `"wxml"`     | 数据来自 `.wxml` 模板（如 `wx:for` 产生的子数据），不做类型映射 |

类型约束：

- 对应的根数据字段类型必须是子组件对应 `properties` 字段类型的**子类型**。
- 与根组件数据字段重名时不合法。

```ts
import { SubComponent } from "annil";
import type { $TopNav } from "path/to/top-nav";

type Root = typeof rootComponent;

SubComponent<Root, $TopNav>()({
  inherit: {
    topNav_title: "title", // 从根组件 data.title 继承
    topNav_item: "wxml", // 数据来自 wxml 模板
  },
});
```

---

### data

**描述** 声明子组件内部数据。可写范围为子组件文档中 `inherit` 未覆盖的剩余字段，以及 `_前缀_` 开头的内部字段。

**类型** `CustomDataConstraint` · **是否必填** 否

**特性**：

- 字段值类型应与子组件文档中定义的类型一致。
- `this.data` 和 `setData` 的类型会被替换为文档中定义的类型（而非配置中的字面量类型）。

```ts
type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
    aaa_obj?: { id: string } | null;
  };
}>;

SubComponent<{}, CompDoc>()({
  inherit: { aaa_obj: "wxml" },
  data: {
    aaa_str: "a", // ✓ 剩余字段
    aaa_num: 123, // ✓ 剩余字段
    _aaa_template: "internal", // ✓ 内部字段
  },
});
```

**错误检测**：

```ts
SubComponent<{}, CompDoc>()({
  inherit: { aaa_str: "wxml" },
  data: {
    // @ts-expect-error "⚠️ 与Inherit字段重复 ⚠️"
    aaa_str: "123",
    // @ts-expect-error "⚠️ 组件文档无需字段 ⚠️"
    aaa_xxx: "xxx",
    _aaa_str: "内部字段", // ✓
  },
});
```

---

### store

**描述** 定义基于 mobx 的响应式数据映射，将全局 store 数据映射到子组件字段。

**类型** `CustomStoreConstraint` · **是否必填** 否

可写范围为 `inherit` 和 `data` 均未覆盖的剩余字段，以及内部字段。getter 参数为父组件 `properties` 的初始传值。

```ts
SubComponent<Root, CompDoc>()({
  inherit: { aaa_str: "wxml" },
  data: { aaa_num: 123 },
  store: {
    aaa_obj: () => userStore.user,
    _aaa_internal: () => storeX.val,
  },
});
```

---

### computed

**描述** 定义子组件计算属性。

**类型** `CustomComputedConstraint` · **是否必填** 否

可写范围为 `inherit`、`data`、`store` 均未覆盖的剩余字段，以及内部字段。

```ts
SubComponent<Root, CompDoc>()({
  computed: {
    aaa_display(): string {
      return this.data.aaa_str + " " + this.data.aaa_num;
    },
  },
});
```

---

### events

**描述** 声明子组件 wxml 事件处理函数。

**类型** `CustomEventsConstraint` · **是否必填** 否

**特性**：

- key 由子组件文档 `events` 中的字段名推导。
- 事件参数 `e.detail` 类型自动推导，自动去除 `Bubbles`、`Capture` 等标记。
- 冒泡/捕获事件额外支持 `_catch` 后缀表示阻止传递。
- 基础组件（`Wm.View` 等）事件默认为 `WMBaseEvent`。
- 可使用 `Detail<T>`、`Mark<T>` 等类型工具覆盖参数类型。

```ts
type CompDoc = ComponentDoc<{
  events: {
    aaa_str: string;
    aaa_bubbles: string | Bubbles;
    aaa_Composed: number | BubblesComposed;
  };
}>;

SubComponent<{}, CompDoc>()({
  events: {
    aaa_str(e) {
      e.detail;
    }, // string
    aaa_bubbles(e) {
      e.detail;
    }, // string
    aaa_Composed_catch(e) {
      e.detail;
    }, // number，阻止穿透
  },
});
```

**基础组件事件**：

```ts
SubComponent<{}, Wm.View>()({
  events: {
    view_tap(e) {/* e: WMBaseEvent */},
    view_longtap(e) {/* e: WMBaseEvent */},
  },
});

SubComponent<{}, Wm.ScrollView>()({
  events: {
    scrollView_bindscroll(e) {
      e.detail; // { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY }
    },
  },
});
```

**自定义参数类型**：

```ts
SubComponent<{}, Wm.View>()({
  events: {
    view_tap(e: Detail<number>) {
      e.detail;
    },
    view_longtap(e: Mark<{ id: string }>) {
      e.mark.id;
    },
  },
});
```

**错误检测**：

```ts
SubComponent<{}, CompDoc>()({
  events: {
    aaa_str(e) {}, // ✓
    // @ts-expect-error 非法字段
    aaa_other() {},
  },
});
```

---

### methods

**描述** 定义子组件方法。

**类型** `CustomMethodsConstraint` · **是否必填** 否

**特性**：

- 方法名必须以 `前缀_` 开头（前缀从子组件文档自动推导）。
- 不可与 `events` 字段重名。
- `this` 指向 `CustomInstance`，可访问根组件 `methods` 和子组件数据。

```ts
SubComponent<Root, Wm.View>()({
  methods: {
    view_xxx() {
      return 123;
    },
  },
  events: {
    view_tap(e) {
      this.view_xxx(); // ✓ 自身方法
      this.rootMethod(); // ✓ 根组件方法（Root 有定义时）
    },
  },
});
```

**错误检测**：

```ts
SubComponent<Root, CompDoc>()({
  methods: {
    // @ts-expect-error 前缀错误（应为 aaa_ 开头）
    xxx_yyy() {},
    // @ts-expect-error 与 events 字段重复
    aaa_str() {},
  },
});
```

---

### watch

**描述** 监听子组件数据变化。与 `RootComponent` 的 `watch` 一致，支持 `(newVal, oldVal)` 和深度比较。

**类型** `CustomWatchOption` · **是否必填** 否

可监听范围包括：子组件 `data`、`store`、`computed` 字段，以及根组件的所有数据字段。

```ts
SubComponent<Root, CompDoc>()({
  data: { aaa_str: "123", _aaa_other: 0 },
  store: { aaa_num: () => 123 },
  watch: {
    aaa_str(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
    aaa_num(newVal, oldVal) {
      console.log("store changed", newVal);
    },
    _aaa_other(newVal, oldVal) {
      console.log("internal", newVal);
    },
    title(newVal, oldVal) {
      console.log("root title", newVal);
    },
  },
});
```

---

### observers

**描述** 原生字段，与微信原生 `observers` 一致。

**类型** `CustomObserversOption` · **是否必填** 否

::: tip 优先使用 `watch`
`watch` 支持 `(newVal, oldVal)` 和深度比较。
:::

---

### pageLifetimes

**描述** 页面生命周期。与 `RootComponent` 的 `pageLifetimes` 行为一致。

**类型** `CustomPageLifetimesOption` · **是否必填** 否

---

### lifetimes

**描述** 组件生命周期，扩展 `beforeCreate`。

**类型** `CustomLifetimesOption` · **是否必填** 否

---

## 前缀机制

子组件所有字段名需遵循 `前缀_xxx` 命名规范。前缀从组件文档自动推导（取 `properties` 或 `events` 第一个字段的第一段）。

当同一组件类型多次出现时，通过第三个泛型参数 `Prefix` 增加额外前缀：

```ts
const topNav = SubComponent<Root, $TopNav>()({/* ... */});
const topNav2 = SubComponent<Root, $TopNav, "Secondary">()({
  // 字段前缀变为 SecondaryTopNav_xxx
  data: { secondaryTopNav_title: "次级标题" },
});
```

### 内部字段

以 `_前缀_` 开头的字段为内部字段，用于存储临时公共数据，不受组件文档约束：

```ts
SubComponent<{}, CompDoc>()({
  data: {
    _aaa_isReady: false,
    _aaa_template: "temp",
  },
});
```

---

## 必传字段检测

自动检测子组件文档中无默认值的必传字段是否被 `inherit`、`data`、`store`、`computed` 完整覆盖。若有遗漏，返回类型为错误字符串：

```ts
type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: string; // 必传
    aaa_bool: boolean; // 必传
    aaa_num?: number; // 可选
  };
}>;

// 类型: "缺少必传的字段aaa_str、aaa_bool"
const SubDoc = SubComponent<{}, CompDoc>()({});
```

---

## 返回类型

返回 `SubComponentDefinition`，包含：

- **`composedEvents`**：子组件文档中标记了 `Composed` 的事件（未被 `_catch` 阻止的部分），去除前缀后暴露给上层组件。

```ts
type CompDoc = ComponentDoc<{
  events: {
    aaa_Composed: number | BubblesComposed;
  };
}>;

const sub = SubComponent<{}, CompDoc>()({
  data: { aaa_num: 0 },
});
// sub.composedEvents: { Composed: number | BubblesComposed }

// 所有 Composed 事件被 _catch 阻止 → 返回 never
const blocked = SubComponent<{}, CompDoc>()({
  data: { aaa_num: 0 },
  events: { aaa_Composed_catch() {} },
});
// blocked: never
```

---

## 完整示例

```ts
import { type ComponentDoc, RootComponent, SubComponent } from "annil";
import type { $BottomBar } from "path/to/bottom-bar";
import type { $TopNav } from "path/to/top-nav";

const rootComponent = RootComponent()({
  data: { title: "首页", count: 0 },
  methods: {
    onHeaderTap() {
      console.log("header tapped");
    },
    increment() {
      this.setData({ count: this.data.count + 1 });
    },
  },
});

type Root = typeof rootComponent;

// 顶部导航
const topNav = SubComponent<Root, $TopNav>()({
  inherit: { topNav_title: "title" },
  events: {
    topNav_tap() {
      this.onHeaderTap();
    },
  },
});

// 底部栏（带额外前缀）
const bottomBar = SubComponent<Root, $BottomBar, "Secondary">()({
  inherit: { secondaryBottomBar_active: "activeTab" },
  data: { _secondaryBottomBar_loading: false },
  methods: {
    secondaryBottomBar_onTap() {
      this.increment();
    },
  },
});
```

## 参考

- 源码入口：[src/api/SubComponent/index.ts](https://github.com/missannil/annil/blob/main/src/api/SubComponent/index.ts)
- 相关类型：[CustomInheritConstraint](https://github.com/missannil/annil/blob/main/src/api/SubComponent/CustomInherit/CustomInheritConstraint.ts) · [CustomEventsConstraint](https://github.com/missannil/annil/blob/main/src/api/SubComponent/CustomEvents/CustomEventsConstraint.ts) · [ComponentDoc](../api/define-component.md)

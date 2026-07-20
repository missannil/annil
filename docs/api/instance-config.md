# instanceConfig

`instanceConfig` 用于向所有后续由 `DefineComponent` 创建的组件和页面注入公共配置。适合注入全局 `data`、响应式 `store`、公共 `methods`、组件 `options` 或 `behaviors`。

注入信息会在 `DefineComponent` 的配置归一化阶段合并到最终的微信原生 `Component` 配置中；它不会创建额外的组件实例。

## 导出项

| 导出项           | 说明                                                    |
| ---------------- | ------------------------------------------------------- |
| `instanceConfig` | 全局实例配置对象，使用 `setInjectInfo()` 设置注入信息。 |
| `IInjectInfo`    | 可通过 TypeScript 模块扩展补充注入字段类型的接口。      |

## setInjectInfo

```ts
instanceConfig.setInjectInfo(info);
```

`info` 的可用字段如下，均为可选：

| 字段        | 作用                                                          |
| ----------- | ------------------------------------------------------------- |
| `data`      | 注入到所有组件实例数据中的静态字段。                          |
| `store`     | 注入全局响应式数据映射；getter 的返回值会自动同步到实例数据。 |
| `methods`   | 注入到所有组件实例上的公共方法。                              |
| `options`   | 注入微信原生组件 `options` 配置。                             |
| `behaviors` | 注入微信原生组件 `behaviors` 列表。                           |

::: warning 初始化时机
请在应用入口处、任何组件或页面模块调用 `DefineComponent` **之前**调用 `setInjectInfo()`。`DefineComponent` 创建组件时会读取当前注入信息；已创建的组件不会因之后的配置变化而重新归一化。
:::

## TypeScript 类型增强

要让注入的 `data`、`store` 和 `methods` 在组件内获得正确的 `this.data` 与 `this` 类型提示，必须通过模块扩展声明 `IInjectInfo`。

```ts
import { type IInjectInfo, instanceConfig } from "annil";

const injectData = {
  appVersion: "1.0.0",
};

const injectMethods = {
  logVersion() {
    return "version";
  },
};

declare module "annil" {
  interface IInjectInfo {
    data: typeof injectData;
    methods: typeof injectMethods;
  }
}

instanceConfig.setInjectInfo({
  data: injectData,
  methods: injectMethods,
});
```

完成声明后，任意组件均可安全使用注入字段：

```ts
RootComponent()({
  methods: {
    showVersion() {
      this.logVersion();
      return this.data.appVersion;
    },
  },
});
```

::: tip JavaScript 项目
JavaScript 项目不需要模块扩展；TypeScript 项目若省略该步骤，注入字段仍会在运行时生效，但无法获得相应的类型检查和补全。
:::

## 注入响应式 store

`store` 的写法与 `RootComponent` 的 `store` 一致：getter 读取响应式状态，依赖变化后会自动更新组件实例数据。注入的 store 字段也可以被组件的 `computed`、`watch` 和 WXML 使用。

```ts
import { instanceConfig } from "annil";
import { observable } from "mobx";

const themeStore = observable({
  theme: "light" as "light" | "dark",
});

const injectStore = {
  theme: () => themeStore.theme,
};

declare module "annil" {
  interface IInjectInfo {
    store: typeof injectStore;
  }
}

instanceConfig.setInjectInfo({
  store: injectStore,
});
```

## 合并与覆盖规则

注入配置先参与最终配置的构建，组件自身的 `RootComponent` 和 `subComponents` 配置随后合并。因此，对于对象字段，组件本地配置优先：

| 注入字段    | 同名本地字段的结果                                       |
| ----------- | -------------------------------------------------------- |
| `data`      | 本地 `data` 覆盖注入数据。未重名的注入字段会保留。       |
| `store`     | 本地 `store` 覆盖注入 store。                            |
| `methods`   | 本地 `methods` 覆盖注入方法。                            |
| `options`   | 本地 `options` 覆盖注入选项。                            |
| `behaviors` | 不覆盖；注入的 behaviors 会追加到最终 behaviors 列表中。 |

例如，全局注入 `appVersion` 与 `logVersion()` 后，组件可以只覆盖同名方法，数据仍保留：

```ts
RootComponent()({
  methods: {
    logVersion() {
      return "component version";
    },
  },
  computed: {
    versionLabel(): string {
      return this.data.appVersion;
    },
  },
});
```

::: warning 重复设置
每次调用 `setInjectInfo()` 都会替换保存的整份注入配置，而不是与上一次调用合并。请集中设置完整的全局注入信息。传入 `undefined` 不会清除已有配置。
:::

## 使用边界

- 仅 `data`、`store` 和 `methods` 会成为实例可访问的字段；`options` 与 `behaviors` 仅影响组件配置。
- 注入字段仍须遵守与组件自身字段相同的运行时约束，例如 `store` getter 必须依赖响应式数据且不应返回 `undefined`。
- 在多个地方声明 `IInjectInfo` 时，TypeScript 会将接口合并；同名字段的类型应保持兼容。

## 参考

- 源码入口：[src/api/InstanceInject/instanceConfig.ts](https://github.com/missannil/annil/blob/main/src/api/InstanceInject/instanceConfig.ts)

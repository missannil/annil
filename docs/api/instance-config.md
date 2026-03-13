# instanceConfig

`instanceConfig` 用于全局注入组件配置能力，常用于注入公共 `data/methods/store/options/behaviors`。

## 导出项

- `instanceConfig`
- `IInjectInfo`

## 可注入字段

- `options`
- `methods`
- `data`
- `store`
- `behaviors`

## 基础示例

```ts
import { type IInjectInfo, instanceConfig } from "annil";

const injectInfo: IInjectInfo = {
  data: {
    appVersion: "1.0.0",
  },
  methods: {
    logFromInject() {
      return "ok";
    },
  },
};

instanceConfig.setInjectInfo(injectInfo);
```

## 说明

- 注入信息会在 `DefineComponent` 归一化阶段合并到最终组件配置
- 注入字段也会参与类型系统推导（例如 `this.data` / `this` 方法）

## 参考

- 源码入口：[src/api/InstanceInject/instanceConfig.ts](https://github.com/missannil/annil/blob/main/src/api/InstanceInject/instanceConfig.ts)

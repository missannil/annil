import { DefineComponent, RootComponent } from "../../../src";
import { storeUser } from "./undefinedReturn.test";

const rootComponent = RootComponent()({
  store: {
    // 有 observable 依赖但首次返回 undefined → console.warn 且不可响应式
    undefinedField: () => storeUser.age > 100 ? storeUser.age : undefined,
    // 正常字段，用于对比验证 store 的其他功能正常
    age: () => storeUser.age,
  },
});

DefineComponent({
  name: "test",
  rootComponent,
});

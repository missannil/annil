import { observable } from "mobx";
import { RootComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

// 约束错误
RootComponent()({
  store: {
    // @ts-expect-error 不能将类型“string”分配给类型“() => unknown”
    userName: user.name,
  },
});

// 重复字段错误
RootComponent()({
  properties: {
    userName: String,
  },
  data: {
    userAge: 20,
  },
  store: {
    // @ts-expect-error 1 与properties字段重复
    userName: () => user.name,
    // @ts-expect-error 2 与userAge字段重复
    userAge: () => user.age,
  },
});

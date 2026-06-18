import { observable } from "mobx";

import type { ComponentDoc } from "../../../DefineComponent/returnType/ComponentDoc";
import { SubComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
  isReady: false,
});

type DocA = ComponentDoc<{
  properties: {
    aaa_str: string;
    aaa_num: number;
  };
}>;

SubComponent<{}, DocA>()({
  store: {
    // 1 可写文档字段
    aaa_str: () => user.name,
    aaa_num: () => user.age,
  },
});

SubComponent<{}, DocA, "a">()({
  store: {
    // 2 可写内部字段
    _aaaA_xxx: () => user.age,
  },
});
// store中可写 额外字段 isReady
SubComponent<{ data: { _num: number } }, DocA, "a">()({
  store: {
    aaaA_isReady: () => user.isReady,
  },
});
// 4 可以返回undefined,表示该字段不可响应式,不报错,有警告。
SubComponent<{ properties: { num: number } }, DocA, "a">()({
  store: {
    aaaA_num: (data) => data.num > 10 ? user.age : void 0,
  },
});

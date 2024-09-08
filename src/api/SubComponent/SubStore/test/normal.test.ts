import { observable } from "mobx";

import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import { SubComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

type DocA = ComponentType<{
  properties: {
    aaa_str: string;
    aaa_num: number;
  };
}>;

SubComponent<{}, DocA>()({
  store: {
    // 1 可写组件字段
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
    aaaA_isReady: () => false,
  },
});

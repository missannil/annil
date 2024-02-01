import { observable } from "mobx";

import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import { SubComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

type DocA = ComponentDoc<{
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

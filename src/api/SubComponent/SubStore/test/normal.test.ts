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
    aaa_str: () => user.name,

    aaa_num: () => user.age,
    // 内部字段
    // _aaa_ddd: () => user.age,
  },
});

SubComponent<{}, DocA, "a">()({
  store: {
    aaaA_str: () => user.name,

    aaaA_num: () => user.age,
    // 内部字段
    // _aaaA_ddd: () => user.age,
  },
});

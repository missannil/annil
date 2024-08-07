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

SubComponent<{
  properties: {
    aaa_str: string;
    aaa_num: number;
  };
}, DocA>()({
  inherit: {
    aaa_str: "aaa_str",
  },
  data: {
    aaa_num: 20,
  },
  store: {
    // @ts-expect-error 1 与 inherit 字段重复
    aaa_str: () => user.name,
    // @ts-expect-error 2 与 data 字段重复
    aaa_num: () => user.age,
    // @ts-expect-error 3 超出约束字段
    num: () => user.age,
  },
});

import { observable } from "mobx";

import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import { CustomComponent } from "../..";
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

CustomComponent<{
  properties: {
    str: string;
  };
}, DocA>()({
  inherit: {
    aaa_str: "str",
  },
  data: {
    aaa_num: 20,
    _aaa_xxx: 30,
  },
  store: {
    // @ts-expect-error 1 与 inherit 字段重复
    aaa_str: () => user.name,
    // @ts-expect-error 2 与 data 字段重复
    aaa_num: () => user.age,
    // @ts-expect-error 3 超出约束字段
    num: () => user.age,
    // @ts-expect-error 4 与data的内部字段重复
    _aaa_xxx: () => user.age,
  },
});
CustomComponent<{
  properties: {
    aaa_num: number;
  };
}, DocA>()({
  store: {
    // @ts-expect-error 与 root 的 properties 字段重复
    aaa_num: () => 123,
  },
});

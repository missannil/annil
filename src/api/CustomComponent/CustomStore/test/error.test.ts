import { observable } from "mobx";

import type { ComponentDoc } from "../../../DefineComponent/returnType/ComponentDoc";
import { CustomComponent } from "../..";
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
    nu1m: () => user.age,
    // @ts-expect-error 4 与data的内部字段重复
    aaa_xxx: () => user.age,
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
// 类型约束错误
CustomComponent<{
  properties: {
    aaa_num: number;
  };
}, DocA>()({
  store: {
    // @ts-expect-error 返回类型错误
    aaa_num: () => undefined,
  },
});

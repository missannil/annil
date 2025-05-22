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

type DocText = ComponentType<{
  properties: {
    aaa_useList: User[];
  };
}>;
type User = {
  name: string;
  age?: number;
};
type AllGoods = Record<string, User[] | undefined>;
const M_User = observable({
  allUser: {
    categoryA: [{ name: "zhao", age: 20 }],
    categoryB: [{ name: "zhao" }],
  } as AllGoods,
});

CustomComponent<{ properties: { categoryId: string } }, DocText>()({
  store: {
    // @ts-expect-error 1 响应式包含undefined时 不可以写成getter函数形式
    aaa_useList: (data) => M_User.allUser[data.categoryId],
  },
});
CustomComponent<{ properties: { categoryId: string } }, DocText>()({
  store: {
    _aaa_categoryList: {
      // @ts-expect-error  2 响应式数据不包含undefined时 不可以写成对象形式
      getter: (data) => M_User.allUser[data.categoryId] as User[],
      default: 0,
    },
  },
});
CustomComponent<{ properties: { categoryId: string } }, DocText>()({
  store: {
    _aaa_categoryList1: {
      getter: (data) => M_User.allUser[data.categoryId] as User[] | undefined,
      // @ts-expect-error  3 默认值应该为[]
      default: 0,
    },
  },
});
CustomComponent<{ properties: { categoryId: string } }, DocText>()({
  store: {
    _aaa_categoryList2: {
      getter: (data) => M_User.allUser[data.categoryId]?.[0],
      // @ts-expect-error 对象类型 默认值为User类型或null namesss错误
      default: { namesss: "zhao", age: 20 },
    },
  },
});

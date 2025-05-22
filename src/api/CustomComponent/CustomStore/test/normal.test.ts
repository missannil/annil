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

CustomComponent<{}, DocA>()({
  store: {
    // 1 可写组件字段
    aaa_str: () => user.name,
    aaa_num: () => user.age,
  },
});

CustomComponent<{}, DocA, "a">()({
  store: {
    // 2 可写内部字段
    _aaaA_xxx: () => user.age,
  },
});
// store中可写 额外字段 isReady
CustomComponent<{ data: { _num: number } }, DocA, "a">()({
  store: {
    aaaA_isReady: () => false,
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
type AllGoods = Record<string, User[]>;
const M_User = observable({
  allUser: {
    categoryA: [{ name: "zhao", age: 20 }],
    categoryB: [{ name: "zhao" }],
  } as AllGoods,
});

// store中getter函数第一个参数为properties的类型
CustomComponent<{ properties: { categoryId: string } }, DocText>()({
  store: {
    // 1 响应式不包含undefined时 只能写成getter函数形式
    aaa_useList: (data) => M_User.allUser[data.categoryId],
    // 2 响应式数据包含undefined时 只能写成对象形式
    _aaa_categoryList: {
      getter: (data) => M_User.allUser[data.categoryId][0].age,
      default: 0,
    },
    _aaa_categoryList1: {
      getter: (data) => M_User.allUser[data.categoryId] as User[] | undefined,
      // 默认值为[]
      default: [],
    },
    _aaa_categoryList2: {
      getter: (data) => M_User.allUser[data.categoryId][0] as User | undefined,
      // 对象类型 默认值为User类型
      default: { name: "zhao", age: 20 },
    },
    _aaa_categoryList3: {
      getter: (data) => M_User.allUser[data.categoryId][0] as User | undefined,
      // 对象类型 默认值可以为null
      default: null,
    },
  },
});

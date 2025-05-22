import { observable } from "mobx";
import type { DetailedType } from "../../../../types/DetailedType";
import { RootComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

// 1 约束错误
RootComponent()({
  store: {
    // @ts-expect-error 1.1 不能将类型“string”分配给类型“() => unknown”
    userName: user.name,
  },
});

// 2 重复字段错误
RootComponent()({
  properties: {
    userName: String,
  },
  data: {
    userAge: 20,
  },
  store: {
    // @ts-expect-error 2.1 与properties字段重复
    userName: () => user.name,
    // @ts-expect-error 2.2 与userAge字段重复
    userAge: () => user.age,
  },
});
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

// store中getter函数第一个参数为properties的类型
RootComponent()({
  properties: {
    categoryId: String as DetailedType<keyof typeof M_User.allUser>,
  },
  data: {
    // categoryList:[],
  },
  store: {
    // @ts-expect-error 1 响应式包含undefined时 不可以写成getter函数形式
    categoryList: (data) => M_User.allUser[data.categoryId],

    _categoryList: {
      // @ts-expect-error  2 响应式数据不包含undefined时 不可以写成对象形式
      getter: (data) => M_User.allUser[data.categoryId] as User[],
      default: [],
    },
    _categoryList1: {
      getter: (data) => M_User.allUser[data.categoryId],
      // @ts-expect-error  3 默认值应该为[]
      default: 0,
    },
    _categoryList2: {
      getter: (data) => M_User.allUser[data.categoryId]?.[0],
      // @ts-expect-error  3 默认值应该为null
      default: 0,
    },
  },
});

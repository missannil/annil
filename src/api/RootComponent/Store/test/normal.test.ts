import { Checking, type Test } from "hry-types";
import { observable } from "mobx";
import { RootComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

const storeDoc = RootComponent()({
  store: {
    userName: () => user.name,
    userAge: () => user.age,
  },
});
void storeDoc;
interface StoreDocExpected {
  store: {
    userName: string;
    userAge: number;
  };
}

// 返回类型为函数返回类型
void Checking<typeof storeDoc, StoreDocExpected, Test.Pass>;

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
RootComponent()({
  properties: {
    categoryId: String,
  },
  data: {
    // categoryList:[],
  },
  store: {
    // 1 响应式不包含undefined时 只能写成getter函数形式
    categoryList: (data) => M_User.allUser[data.categoryId],
    // 2 响应式数据包含undefined时 只能写成对象形式
    _categoryList: {
      getter: (data) => M_User.allUser[data.categoryId][0].age,
      default: 0,
    },
    _categoryList1: {
      getter: (data) => M_User.allUser[data.categoryId] as User[] | undefined,
      // 默认值为[]
      default: [],
    },
    _categoryList2: {
      getter: (data) => M_User.allUser[data.categoryId][0] as User | undefined,
      // 对象类型 默认值为User类型
      default: { name: "zhao", age: 20 },
    },
    _categoryList3: {
      getter: (data) => M_User.allUser[data.categoryId][0] as User | undefined,
      // 对象类型 默认值可以为null
      default: null,
    },
  },
});

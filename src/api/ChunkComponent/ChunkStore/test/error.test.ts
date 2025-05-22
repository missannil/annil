import { observable } from "mobx";
import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "./mock";

// 1 前缀错误
ChunkComponent<Mock_RootDoc, "slot">()({
  store: {
    // @ts-expect-error "⚠️字段不合法,请使用'slot_'或'_slot_'开头的字段名⚠️")
    xxx_num: () => 1,
  },
});

// 2. 内部字段前缀错误
ChunkComponent<Mock_RootDoc, "xxx">()({
  store: {
    // @ts-expect-error "⚠️字段不合法,请使用'xxx_'或'_xxx_'开头的字段名⚠️")
    _xxxx_num: () => 1,
  },
});

// 3. 与父级字段重复
ChunkComponent<Mock_RootDoc, "slot">()({
  store: {
    // @ts-expect-error "⚠️字段重复⚠️")
    slot_num: () => 1,
    // @ts-expect-error "⚠️字段重复⚠️")
    _slot_str: () => "1",
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

ChunkComponent<{ properties: { categoryId: string } }>()({
  store: {
    // @ts-expect-error 1 响应式包含undefined时 不可以写成getter函数形式
    categoryList: (data) => M_User.allUser[data.categoryId],

    _categoryList: {
      // @ts-expect-error  2 响应式数据不包含undefined时 不可以写成对象形式
      getter: (data) => M_User.allUser[data.categoryId] as User[],
      default: 0,
    },
    _categoryList1: {
      getter: (data) => M_User.allUser[data.categoryId],
      // @ts-expect-error  3 默认值应该为[]
      default: 0,
    },
    _categoryList2: {
      getter: (data) => M_User.allUser[data.categoryId]?.[0],
      // @ts-expect-error  3 对象类型错误  namesss
      default: { namesss: "zhao", age: 20 },
    },
  },
});

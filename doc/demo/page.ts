import { observable } from "mobx";
import { DefineComponent, type DetailedType, RootComponent, SubComponent } from "../../src";
import type { CompA } from "./componentA";
import type { User } from "./types";

const compA = SubComponent<Root, CompA>()({
  computed: {
    subA_user() {
      return this.data.user;
    },
  },
});

// 根组件类型
type Root = typeof rootComponent;

const cart = observable({
  count: 1,
  add() {
    this.count++;
  },
});

const rootComponent = RootComponent()({
  // 表示组件是否为页面,可选,默认false
  isPage: true,

  properties: {
    // 通过DetailedType明确具体类型。
    user: Object as DetailedType<User>,
  },
  data: {
    num: 1,
  },
  store: {
    // store数据使用箭头函数写法
    goodsCount: () => cart.count,
  },
  computed: {
    // 计算属性字段 可对所有数据计算
    goodsCountAddNum() {
      return this.data.goodsCount + this.data.num;
    },
  },
  // 事件和方法分离书写的
  events: {
    onTap() {
      // 调用store方法,修改store数据
      cart.add();

      // 组件store数据自动相应
      console.log(this.data.goodsCount === 2); // true
    },
  },
  watch: {
    goodsCountAddNum(newValue: number, oldValue: number) {
      console.log(newValue, oldValue); // 3  2
    },
  },
});

DefineComponent({
  path: "/pages/path",
  rootComponent,
  subComponents: [compA],
});

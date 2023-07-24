import { Checking, type Test } from "hry-types";
import type { SpecificType } from "../../../../types/SpecificType";
import { MainComponent } from "../..";
import type { Mock_Cart, Mock_User } from "../../Properties/test/PropertiesConstraint.test";

/**
 * watch properties字段
 */
MainComponent({
  properties: {
    num: Number,
    obj: Object as SpecificType<Mock_User | Mock_Cart>,
    optional: {
      type: Number,
      value: 123,
    },
    union: {
      type: Object as SpecificType<Mock_User | Mock_Cart>,
      optionalTypes: [String as SpecificType<"male" | "female">, Number as SpecificType<0 | 1 | 2>],
    },
  },
});

/**
 * watch properties字段
 */
MainComponent({
  properties: {
    num: Number,
    obj: Object as SpecificType<Mock_User | Mock_Cart>,
    optional: {
      type: Number,
      value: 123,
    },
    union: {
      type: Object as SpecificType<Mock_User | Mock_Cart>,
      optionalTypes: [String as SpecificType<"male" | "female">, Number as SpecificType<0 | 1 | 2>],
    },
  },
  watch: {
    num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    obj(newValue, oldValue) {
      Checking<Mock_User | Mock_Cart, typeof newValue, Test.Pass>;

      Checking<Mock_User | Mock_Cart, typeof oldValue, Test.Pass>;
    },
    optional(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    union(newValue, oldValue) {
      Checking<0 | 1 | 2 | Mock_User | Mock_Cart | "male" | "female", typeof newValue, Test.Pass>;

      Checking<0 | 1 | 2 | Mock_User | Mock_Cart | "male" | "female", typeof oldValue, Test.Pass>;
    },
    "obj.**"(newValue, oldValue) {
      Checking<Mock_User | Mock_Cart, typeof newValue, Test.Pass>;

      Checking<Mock_User | Mock_Cart, typeof oldValue, Test.Pass>;
    },
  },
});

/**
 * watch  data字段
 */

MainComponent({
  data: {
    num: 123,
    obj: {} as Mock_User,
    reactiveLiteral: () => "str",
    reactiveNumber: () => ({} as number),
    reactiveUser: () => ({} as Mock_User),
  },
  watch: {
    num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    obj(newValue, oldValue) {
      Checking<Mock_User, typeof newValue, Test.Pass>;

      Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    "obj.**"(newValue, oldValue) {
      Checking<Mock_User, typeof newValue, Test.Pass>;

      Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    reactiveLiteral(newValue, oldValue) {
      Checking<"str", typeof newValue, Test.Pass>;

      Checking<"str", typeof oldValue, Test.Pass>;
    },
    reactiveUser(newValue, oldValue) {
      Checking<Mock_User, typeof newValue, Test.Pass>;

      Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    "reactiveUser.**"(newValue, oldValue) {
      Checking<Mock_User, typeof newValue, Test.Pass>;

      Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    // @ts-expect-error 改类型会报错
    reactiveNumber(newValue: string, oldValue) {
      Checking<string, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
  },
});

/**
 *  可单独watch computed字段不报错
 */
MainComponent({
  properties: {
    Pnum: Number,
  },
  data: {
    DNum: 123,
  },
  computed: {
    CNum() {
      return this.data.Pnum + this.data.DNum;
    },
    // Cobj() {
    //   return {} as Mock_User;
    // },
  },
  watch: {
    // watch computed字段需要手写类型,可悬停鼠标到key查看类型
    CNum(newValue: number, oldValue: number) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    // Cobj(newValue: Mock_User, oldValue: Mock_User) {
    //   Checking<Mock_User>()(newValue);

    //   Checking<Mock_User>()(oldValue);
    // },
    // "Cobj.**"(newValue: Mock_User, oldValue: Mock_User) {
    //   Checking<Mock_User>()(newValue);

    //   Checking<Mock_User>()(oldValue);
    // },
  },
});

/**
 * watch 修改computed字段类型报错
 */
MainComponent({
  properties: {
    num: Number,
  },
  data: {
    Dnum: 123,
  },
  computed: {
    C1() {
      return this.data.num + this.data.Dnum;
    },
  },
  watch: {
    // @ts-expect-error  newValue类型默认为number, 改为string类型会报错
    C1(newValue: string, oldValue: number) {
      Checking<string, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
  },
});

/**
 * watch 多余字段报错
 */
MainComponent({
  properties: {
    num: Number,
  },
  data: {
    str: "123",
    reactiveNum: () => ({} as number),
  },
  computed: {
    Cnum() {
      return this.data.num + this.data.reactiveNum;
    },
  },
  watch: {
    num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    str(newValue, oldValue) {
      Checking<string, typeof newValue, Test.Pass>;

      Checking<string, typeof oldValue, Test.Pass>;
    },
    Cnum(newValue: number, oldValue: number) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    // @ts-expect-error otherFields不在字面量约束中
    otherFields() {
      1;
    },
  },
});

/**
 * Watch数据中有对象字段时(user),单独watch计算字段不报错 (watch test #1111)
 */
MainComponent({
  properties: {
    Pnum: Number,
    user: Object as SpecificType<Mock_Cart>,
  },
  data: {
    DNum: 123,
  },
  computed: {
    CNum() {
      return this.data.Pnum + this.data.DNum;
    },
  },
  watch: {
    CNum(newValue: number, oldValue: number) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
  },
});

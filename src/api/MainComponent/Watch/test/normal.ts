import { ValueChecking } from "hry-types";
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
  watch: {
    num(newValue, oldValue) {
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
    },
    obj(newValue, oldValue) {
      ValueChecking<Mock_User | Mock_Cart>()(newValue);

      ValueChecking<Mock_User | Mock_Cart>()(oldValue);
    },
    optional(newValue, oldValue) {
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
    },
    union(newValue, oldValue) {
      ValueChecking<0 | 1 | 2 | Mock_User | Mock_Cart | "male" | "female">()(newValue);

      ValueChecking<0 | 1 | 2 | Mock_User | Mock_Cart | "male" | "female">()(oldValue);
    },
    "obj.**"(newValue, oldValue) {
      ValueChecking<Mock_User | Mock_Cart>()(newValue);

      ValueChecking<Mock_User | Mock_Cart>()(oldValue);
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
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
    },
    obj(newValue, oldValue) {
      ValueChecking<Mock_User>()(newValue);

      ValueChecking<Mock_User>()(oldValue);
    },
    "obj.**"(newValue, oldValue) {
      ValueChecking<Mock_User>()(newValue);

      ValueChecking<Mock_User>()(oldValue);
    },
    reactiveLiteral(newValue, oldValue) {
      ValueChecking<"str">()(newValue);

      ValueChecking<"str">()(oldValue);
    },
    reactiveUser(newValue, oldValue) {
      ValueChecking<Mock_User>()(newValue);

      ValueChecking<Mock_User>()(oldValue);
    },
    "reactiveUser.**"(newValue, oldValue) {
      ValueChecking<Mock_User>()(newValue);

      ValueChecking<Mock_User>()(oldValue);
    },
    // @ts-expect-error 改类型会报错
    reactiveNumber(newValue: string, oldValue) {
      ValueChecking<string>()(newValue);

      ValueChecking<number>()(oldValue);
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
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
    },
    // Cobj(newValue: Mock_User, oldValue: Mock_User) {
    //   ValueChecking<Mock_User>()(newValue);

    //   ValueChecking<Mock_User>()(oldValue);
    // },
    // "Cobj.**"(newValue: Mock_User, oldValue: Mock_User) {
    //   ValueChecking<Mock_User>()(newValue);

    //   ValueChecking<Mock_User>()(oldValue);
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
      ValueChecking<string>()(newValue);

      ValueChecking<number>()(oldValue);
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
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
    },
    str(newValue, oldValue) {
      ValueChecking<string>()(newValue);

      ValueChecking<string>()(oldValue);
    },
    Cnum(newValue: number, oldValue: number) {
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
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
      ValueChecking<number>()(newValue);

      ValueChecking<number>()(oldValue);
    },
  },
});

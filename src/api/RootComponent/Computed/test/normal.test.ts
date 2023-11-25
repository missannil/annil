import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { SpecificType } from "../../../../types/SpecificType";
import { RootComponent } from "../..";
import type { Mock_User } from "../../Properties/expected/normalRequired";

/**
 * computed字段约束为 [ComputedConstraint](../ComputedConstraint.ts)
 */
const RootDoc = RootComponent()({
  properties: {
    firstName: String,
  },
  data: {
    lastName: "lastName",
  },
  computed: {
    fullName() {
      // 1 计算属性字段可以通过this.data 引用properties、data
      return this.data.firstName + this.data.lastName;
    },
    user() {
      return {} as Mock_User;
    },
    // 2. 可依赖其他计算字段
    id_fullName() {
      return this.data.user.id + this.data.fullName;
    },
    readOnly() {
      // 3 this.data 类型是深度只读的
      Checking<
        typeof this.data,
        ReadonlyDeep<{
          firstName: string;
          lastName: string;
          fullName: string;
          user: Mock_User;
          id_fullName: string;
          readOnly: "str";
        }>,
        Test.Pass
      >;

      return "str";
    },
  },
});

// 4. 返回的文档类型中computed类型为计算字段函数返回类型
type ComputedDocExpected = {
  fullName: string;
  user: Mock_User;
  id_fullName: string;
  readOnly: "str";
};

Checking<typeof RootDoc["computed"], ComputedDocExpected, Test.Pass>;

/**
 *  5 无计算属性字段时,返回文档中无computed字段
 */
const noComputedFieldDoc = RootComponent()({
  methods: {
    M1() {
      // 5.1 无computed,this.data中为{}
      Checking<typeof this.data, {}, Test.Pass>;
    },
  },
});

Checking<typeof noComputedFieldDoc, { methods: { M1: () => void } }, Test.Pass>;

/**
 *  6 计算属性字段为空对象时,返回文档中无computed字段
 */
const EmptyComputedFieldDoc = RootComponent()({
  computed: {},
  methods: {
    M1() {
      // 6.1 computed为{},this.data中为{}
      Checking<typeof this.data, {}, Test.Pass>;
    },
  },
});

Checking<typeof EmptyComputedFieldDoc, { methods: { M1: () => void } }, Test.Pass>;

RootComponent()({
  isPage: true,
  properties: {
    obj: Object as SpecificType<{ name: string; age: number }>,
  },
  computed: {
    age() {
      // 页面实例对象不添加Null,因为计算属性初始化在onLoad之后(即properties已传入时,且不会传入Null)
      return this.data.obj.age;
    },
  },
});

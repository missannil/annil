/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checking, type Test } from "hry-types";
import type { ComputeIntersection } from "hry-types/src/Object/_api";

import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import { RootComponent } from "../..";
import type { Mock_User } from "../../Properties/test/normalRequired.test";
type User = {
  name: string;
  age?: number;
};

const RootDoc = RootComponent()({
  properties: {
    firstName: String,
  },
  data: {
    lastName: "lastName",
    mock_User: {} as Mock_User,
  },
  store: {
    prefix: () => "hry-", // 模拟而已
  },
  computed: {
    fullName() {
      // 1 计算属性字段可以通过this.data 引用properties、data、store字段
      return this.data.prefix + this.data.firstName + this.data.lastName;
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
        ComputeIntersection<
          {
            firstName: string;
            lastName: string;
            mock_User: Mock_User;
            fullName: string;
            user: Mock_User;
            prefix: string;
            id_fullName: string;
            readOnly: "str";
          } & IInjectAllData
        >,
        Test.Pass
      >;

      // @ts-expect-error  深度只读 不可赋值
      this.data.user.id = "xxx";

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
      Checking<typeof this.data, IInjectAllData, Test.Pass>;
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
      Checking<typeof this.data, IInjectAllData, Test.Pass>;
    },
  },
});

Checking<typeof EmptyComputedFieldDoc, { methods: { M1: () => void } }, Test.Pass>;

type Custom = { type: "custom"; xxx: string };
type Chunk = { type: "chunk"; yyy: number };
type Union = Custom | Chunk;
/**
 *  6 计算属性可以使用实例上的方法和属性
 */
RootComponent()({
  data: {
    union: { type: "custom", xxx: "123" } as Union,
  },
  computed: {
    count(): string | number {
      const { union } = this.data;
      return this.isCustom(union) ? union.xxx : union.yyy;
    },
  },
  methods: {
    isCustom(union: Union): union is Custom {
      return union.type === "custom";
    },
  },
});

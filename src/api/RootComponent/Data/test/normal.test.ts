import { Checking, type Test } from "hry-types";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import { RootComponent } from "../..";

/**
 * data字段约束为object,函数类型表示引入的响应式字段(mobx)
 */
const RootDoc = RootComponent()({
  data: {
    gender: <"male" | "female"> "male", // 联合字面量
    num: 123,
    _innernalFields: 123, // 内部字段无法在wxml中使用
  },
  methods: {
    foo() {
      // 1. data配置类型为函数时,this.data中变为函数返回类型
      Checking<
        typeof this.data,
        ReadonlyDeep<{ gender: "male" | "female"; num: number; _innernalFields: number }>,
        Test.Pass
      >;
    },
  },
});

type RootDocExpected = {
  gender: "male" | "female";
  num: number;
  _innernalFields: number;
};

// 2. data配置类型为函数时,dataDoc中变为函数返回类型
Checking<typeof RootDoc["data"], RootDocExpected, Test.Pass>;

// data为空对象时
const EmptyDataRootDoc = RootComponent()({
  data: {},
  methods: {
    M1() {
      // 3.1 data为空对象时 this.data为{}类型
      Checking<typeof this.data, {}, Test.Pass>;
    },
  },
});

// 3.2 data为空对象时 返回文档中无data字段
Checking<typeof EmptyDataRootDoc, { methods: { M1: () => void } }, Test.Pass>;

/**
 *  无data字段时
 */
const noDataRootDoc = RootComponent()({
  methods: {
    M1() {
      // 4.1 data为空对象时 this.data为{}类型
      Checking<typeof this.data, {}, Test.Pass>;
    },
  },
});

// 4.2 data为空对象时 返回文档中无data字段
Checking<typeof noDataRootDoc, { methods: { M1: () => void } }, Test.Pass>;

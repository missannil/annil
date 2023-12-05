import { Checking, type Test } from "hry-types";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import { RootComponent } from "../..";

type Gender = "male" | "female";

const RootDoc = RootComponent()({
  data: {
    gender: <Gender> "male", // 联合字面量
    num: 123,
    _innernalFields: 123, // 内部字段无法在wxml中使用
  },
  methods: {
    foo() {
      Checking<
        typeof this.data,
        ReadonlyDeep<{ gender: Gender; num: number; _innernalFields: number }>,
        Test.Pass
      >;
    },
  },
});

type RootDocExpected = {
  gender: Gender;
  num: number;
  _innernalFields: number;
};

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

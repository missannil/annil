import { Checking, type Test } from "hry-types";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import { RootComponent } from "../..";

const RootDoc = RootComponent()({
  data: {
    gender: <"male" | "female"> "male",
    num: 123,
    _innernalFields: false,
  },
  methods: {
    foo() {
      // 1 this.data 类型检查
      Checking<typeof this.data, ReadonlyDeep<RootDocExpected>, Test.Pass>;
    },
  },
});

type RootDocExpected = {
  gender: "male" | "female";
  num: number;
  _innernalFields: boolean;
};

// 2 返回文档中的data字段类型检查
Checking<typeof RootDoc["data"], RootDocExpected, Test.Pass>;

/**
 * data字段配置为空对象时
 */
const EmptyDataRootDoc = RootComponent()({
  data: {},
  methods: {
    M1() {
      // 3  this.data为 `{}`类型
      Checking<typeof this.data, {}, Test.Pass>;
    },
  },
});

// 4  返回文档中无data字段
Checking<typeof EmptyDataRootDoc, { methods: { M1: () => void } }, Test.Pass>;

/**
 *   无data字段配置时
 */
const noDataRootDoc = RootComponent()({
  methods: {
    M1() {
      // 5 data为空对象时 this.data为{}类型
      Checking<typeof this.data, {}, Test.Pass>;
    },
  },
});

// 6 返回文档中无data字段
Checking<typeof noDataRootDoc, { methods: { M1: () => void } }, Test.Pass>;

// 1 如果在组件A构建前初始化A组件的计算属性,可以在A组件并入子组件B时传递给组件B计算属性值,但由于A组件的计算属性可能依赖properties字段,所以B组件的watch字段监控的properties(即A传递的计算属性)是无意义的。

// 2 如果在created字段初始化A组件的计算属性.与上述一样效果

// 3 如果在attached初始化计算属性那么 那么会导致子组件B 接受properties时报警告，因为A组件的计算属性还为生效即为undefined。

// 4 watch 的建立时机问题： 一定是在created之前

// 问题时watch的建立需要计算属性初始化的数据依赖情况。即properties是否被依赖

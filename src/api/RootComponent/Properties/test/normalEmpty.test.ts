import { Checking, type Test } from "hry-types";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import { RootComponent } from "../..";

/**
 * Properties配置为`{}`时
 */
const emptyObj = RootComponent()({
  properties: {},
  methods: {
    foo() {
      // 1 this.data 为注入数据类型
      Checking<typeof this.data, IInjectAllData, Test.Pass>;
    },
  },
});

// 2 返回文档类型无properties字段
Checking<typeof emptyObj, {
  methods: {
    foo(): void;
  };
}, Test.Pass>;

/**
 * 无Properties配置时
 */
const noProperties = RootComponent()({
  methods: {
    foo() {
      // 3 this.data 为注入数据类型
      Checking<typeof this.data, IInjectAllData, Test.Pass>;
    },
  },
});

// 4 返回文档类型无properties字段
Checking<typeof noProperties, {
  methods: {
    foo(): void;
  };
}, Test.Pass>;

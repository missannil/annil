import { typeEqual } from "../../../../utils/typeEqual";
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
      void typeEqual<typeof this.data, IInjectAllData>;
    },
  },
});
void emptyObj;
// 2 返回文档类型无properties字段
void typeEqual<typeof emptyObj, {
  methods: {
    foo(): void;
  };
}>;

/**
 * 无Properties配置时
 */
const noProperties = RootComponent()({
  methods: {
    foo() {
      // 3 this.data 为注入数据类型
      void typeEqual<typeof this.data, IInjectAllData>;
    },
  },
});
void noProperties;
// 4 返回文档类型无properties字段
void typeEqual<typeof noProperties, {
  methods: {
    foo(): void;
  };
}>;

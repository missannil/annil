import { Checking, type Test } from "hry-types";
import type { ComponentDoc } from "../../../DefineComponent/returnType/ComponentDoc";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { CustomComponent } from "../..";

type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
    aaa_obj?: Mock_User | null;
  };
}>;

CustomComponent<{}, CompDoc>()({
  inherit: {
    aaa_obj: "wxml",
  },
  data: {
    // 1. 子组件key和对应的类型。
    aaa_str: "a",
    aaa_num: 123,
    // 2. 可写内部字段,一般作为公共的临时数据。
    _aaa_template: "internal", // 内部临时数据
  },
});

CustomComponent<{ data: { _num: number } }, CompDoc>()({
  inherit: {
    aaa_str: "wxml",
    aaa_num: "wxml",
    aaa_obj: "wxml",
  },
  data: {
    // 3 可写内部字段
    _aaa_str: "str",
  },
});

CustomComponent<{}, CompDoc>()({
  data: {
    aaa_str: "a" as "a" | "b",
    aaa_num: 123 as number,
    aaa_obj: null as Mock_User | null,
    _aaa_str: "str",
  },
  methods: {
    aaa_1() {
      // 4 this.data中的data配置数据类型应该与文档类型一致,比如aaa_str的类型为"a" | "b"而非string
      void Checking<
        typeof this.data,
        ComputeIntersection<
          {
            _aaa_str: string;
            aaa_str: "a" | "b";
            aaa_num: number;
            aaa_obj: Mock_User | null;
          } & IInjectAllData
        >,
        Test.Pass
      >;
    },
  },
});

// 确保实例和setData中使用的data字段类型为文档中定义的类型而非data配置中的类型(data中配置的类型可能推导默认为字面量类型,通过加入Replace泛型替换为对应的文档类型。),
CustomComponent<{ data: { _num: number } }, CompDoc>()({
  data: {
    aaa_obj: null, // 类型为null 而非 Mock_User | null
    aaa_str: "a", // 类型为"a" 而非string
    aaa_num: 123, // 类型为123 而非number
  },
  lifetimes: {
    attached() {
      // 实例中的aaa_obj类型为文档中定义的类型 Mock_User | null 而非data配置中的类型 null
      void Checking<typeof this.data.aaa_obj, Mock_User | null, Test.Pass>;
      // setData中aaa_str类型为文档中定义的类型 "a" | "b" 而非data配置中的类型 "a"
      this.setData({
        aaa_str: "b",
      });
    },
  },
});
// data中可写 额外字段 isReady
CustomComponent<{ data: { _num: number } }, CompDoc>()({
  data: {
    aaa_isReady: false,
  },
});

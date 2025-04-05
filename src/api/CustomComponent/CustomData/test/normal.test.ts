import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { CustomComponent } from "../..";

type CompDoc = ComponentType<{
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
    aaa_str: "a",
    aaa_num: 123,
    aaa_obj: null,
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

// data建立的类型在setData时为组件类型
CustomComponent<{ data: { _num: number } }, CompDoc>()({
  data: {
    aaa_obj: null,
  },
  lifetimes: {
    attached() {
      void Checking<typeof this.data.aaa_obj, Mock_User | null, Test.Pass>;

      this.setData({
        aaa_obj: {} as Mock_User, // aaa_obj 类型为 Mock_User | null 而非 null
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

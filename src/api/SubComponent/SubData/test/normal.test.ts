import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";

import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
    aaa_obj?: Mock_User | null;
  };
}>;

SubComponent<{}, CompDoc>()({
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

//
SubComponent<{ data: { _num: number } }, CompDoc>()({
  inherit: {
    aaa_str: "wxml",
    aaa_num: "wxml",
    aaa_obj: "wxml",
  },
  data: {
    // 3 CompDoc去除Inherit字段后为空时,可写内部字段
    _aaa_str: "str",
  },
});

SubComponent<{}, CompDoc>()({
  data: {
    aaa_str: "a",
    aaa_num: 123,
    aaa_obj: null,
    _aaa_str: "str",
  },
  methods: {
    aaa_1() {
      // 4 this.data中的data配置数据
      Checking<
        typeof this.data,
        ReadonlyDeep<{
          aaa_str: "a";
          aaa_num: 123;
          aaa_obj: null;
          _aaa_str: string;
        }>,
        Test.Pass
      >;
    },
  },
});

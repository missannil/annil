import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";

import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

type OnlyCustomCompDoc = ComponentDoc<{
  customEvents: { aaa_str: string };
}>;

// 1 CompDoc无properties字段时 data字段只可写内部字段
SubComponent<{}, OnlyCustomCompDoc>()({
  data: {
    // @ts-expect-error "⚠️ 与Inherit字段重复或组件文档无需字段 ⚠️"
    aaa_str: "str",
    _aaa_str: "str", // 内部字段 ok
  },
});

type OnlyPropsCompDoc = ComponentDoc<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
    aaa_obj?: Mock_User | null;
  };
}>;

// 2 CompDoc有properties字段但去除Inherit字段后为空,只可写临时字段(内部字段)
SubComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_str: "wxml",
    aaa_num: "wxml",
    aaa_obj: "wxml",
  },
  data: {
    // @ts-expect-error "⚠️ 与Inherit字段重复或组件文档无需字段 ⚠️"
    aaa_str: "123",
    // @ts-expect-error "⚠️ 与Inherit字段重复或组件文档无需字段 ⚠️"
    errorfield: "str",
    _aaa_str: "内部字段", // ok
  },
});

// 3 重复字段和非组件所需字段错误
SubComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_str: "wxml",
  },
  data: {
    aaa_num: 123, // ok
    aaa_obj: null, // ok
    // @ts-expect-error "⚠️ Inherit字段重复 ⚠️"
    aaa_str: "123",
    // @ts-expect-error  "⚠️ 组件文档无需字段 ⚠️"
    aaa_xxx: "组件文档无需字段会报错",
    _aaa_xxx: 123, // ok 内部字段可写
  },
});

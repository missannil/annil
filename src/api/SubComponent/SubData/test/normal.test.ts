import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { Wm } from "../../../../thirdLib";
import type { CompDocExtends } from "../../../../types/CompDocExtends";
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

// 1 data字段的key提示为:组件文档字段去除inherit字段后的字段.值类型为:文档对应字段类型或函数返回类型(表示引入的store数据)。或临时字段(内部运算所用字段,无法渲染到页面)key,值类型为unknown
SubComponent<{}, CompDoc>()({
  inherit: {
    aaa_obj: "wxml",
  },
  data: {
    aaa_str: "a",
    aaa_num: () => 123,
    _aaa_template: "internal", // 内部临时数据
  },
});

// 2. 使用CompDocExtends泛型拓展组件文档,满足内部组件内部包含一些slot或基本组件数据
type viewExtends = CompDocExtends<Wm.View, { view_obj: Mock_User | null; view_str: string; view_ddd: number }>;

const res = SubComponent<{}, viewExtends>()({
  inherit: {
    view_style: "wxml",
  },
  data: {
    // view组件key
    view_class: "h-full",
    view_hover_class: "none",
    // 拓展的字段
    view_obj: () => ({} as Mock_User | null),
    view_str: () => "a",
    view_ddd: () => 123,
  },
});

Checking<typeof res, never, Test.Pass>;

// 2  CompDoc去除Inherit字段后为空,可写非临时字段(内部字段)
SubComponent<{}, CompDoc>()({
  inherit: {
    aaa_str: "wxml",
    aaa_num: "wxml",
    aaa_obj: "wxml",
  },
  data: {
    _aaa_str: "str",
  },
});

// 3 CompDoc 为空对象时,参数为空对象,返回never

type EmptyCompDoc = ComponentDoc<{}>;

const res1 = SubComponent<{}, EmptyCompDoc>()({});

Checking<typeof res1, never, Test.Pass>;

SubComponent<{}, CompDoc>()({
  data: {
    aaa_str: "a",
    aaa_num: 123,
    aaa_obj: null,
    _aaa_str: "str",
  },
  methods: {
    aaa_1() {
      // 4 this.data 深度只读
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

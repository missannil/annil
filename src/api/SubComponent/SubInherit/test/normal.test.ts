import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type Mock_RootDoc = RootComponentDoc<{
  properties: {
    required_num: number;
    optional_literal_num?: 123 | 456 | 789;
    unionStrNum: string | number;
    required_obj: object | null;
    optional_obj?: object;
  };
  data: {
    str: string;
    literal_str: "a" | "b" | "c";
    bool: boolean;
  };
  computed: {
    Cuinon: string | boolean;
  };
}>;

type Mock_CompDoc = ComponentDoc<{
  properties: {
    aaa_num: number;
    aaa_literal_num: 123 | 456;
    aaa_str?: string;
    aaa_union: string | boolean;
    aaa_obj: object | null;
    aaa_obj1?: object | null;
  };
}>;

// 1 没有可继承的数据,类型可为'wxml',表示数据来自wxml(例如数据来自父组件循环wx:for后的数据等情况)
SubComponent<{}, Mock_CompDoc>()({
  inherit: {
    aaa_num: "wxml",
    aaa_str: "wxml",
    aaa_union: "wxml",
    aaa_obj: "wxml",
    aaa_obj1: "wxml",
  },
});

// 2 RootDoc不为空时,可继承对应类型的字段。
SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  inherit: {
    aaa_num: "" as "optional_literal_num" | "required_num" | "wxml",
    aaa_str: "" as "str" | "literal_str" | "wxml",
    aaa_obj: "" as "required_obj" | "optional_obj" | "wxml",
    aaa_obj1: "" as "required_obj" | "optional_obj" | "wxml",
  },
});

// inherit字段最终会在配置对象中删除,它用类型检测。

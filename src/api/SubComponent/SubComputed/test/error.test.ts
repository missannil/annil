import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import { SubComponent } from "../..";

type OnlyCustomCompDoc = ComponentDoc<{
  customEvents: { aaa_str: string };
}>;

// 1 CompDoc的properties为空时,写任何字段都报错
SubComponent<{}, OnlyCustomCompDoc>()({
  computed: {
    // @ts-expect-error ⚠️"重复或无效的字段"⚠️
    aaa_xxx() {
      return 1;
    },
  },
});

type OnlyPropsCompDoc = ComponentDoc<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
  };
}>;

// 2 去除inhrit和data字段后无组件字段约束时,只可写内部字段
SubComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_str: "wxml",
  },
  data: {
    aaa_num: 123,
  },
  computed: {
    _aaa_xxx() {},
    // @ts-expect-error 只可写内部字段
    aaa_yyy() {},
  },
});

// 3 类型错误
SubComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_str: "wxml",
  },
  computed: {
    // @ts-expect-error  类型错误
    aaa_num() {
      return "string";
    },
  },
});

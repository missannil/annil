import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import { CustomComponent } from "../..";

type OnlyCustomCompDoc = ComponentType<{
  customEvents: { aaa_str: string };
}>;

// 1 CompDoc的properties为空时,写任何字段都报错
CustomComponent<{}, OnlyCustomCompDoc>()({
  computed: {
    // @ts-expect-error ⚠️"重复或无效的字段"⚠️
    aaa_xxx() {
      return 1;
    },
  },
});

type OnlyPropsCompDoc = ComponentType<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
  };
}>;

// 2 去除inhrit和data字段后无组件字段约束时,只可写内部字段
CustomComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_str: "wxml",
  },
  data: {
    aaa_num: 123,
  },
  computed: {
    _aaa_xxx() {
      void 0;
    },
    // @ts-expect-error 只可写内部字段
    aaa_yyy() {
      void 0;
    },
  },
});

// 3 类型错误
CustomComponent<{}, OnlyPropsCompDoc>()({
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
// 4 与data的内部字段重复
CustomComponent<{}, OnlyPropsCompDoc>()({
  data: {
    _aaa_fff: 123,
  },
  computed: {
    // @ts-expect-error 与data的内部字段重复
    _aaa_fff(): number {
      return 123;
    },
  },
});
// 5 与store的内部字段重复
CustomComponent<{}, OnlyPropsCompDoc>()({
  store: {
    _aaa_ccc: () => 123,
  },
  computed: {
    // @ts-expect-error 与store的内部字段重复
    _aaa_ccc(): number {
      return 123;
    },
  },
});
// 6 与root字段重复
CustomComponent<{ data: { _aaa_ccc: 123 } }, OnlyPropsCompDoc>()({
  computed: {
    // @ts-expect-error 与store的内部字段重复
    _aaa_ccc(): number {
      return 123;
    },
  },
});

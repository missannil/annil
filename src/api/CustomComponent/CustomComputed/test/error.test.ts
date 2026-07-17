import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import { CustomComponent } from "../..";

type OnlyCustomCompDoc = CreateComponentDoc<"onlyCustom", {
  events: { str: string };
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

type OnlyPropsCompDoc = CreateComponentDoc<"onlyProps", {
  properties: {
    str: "a" | "b";
    num?: number;
  };
}>;

// 2 去除inhrit和data字段后无组件字段约束时,只可写内部字段
CustomComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    onlyProps_str: "wxml",
  },
  data: {
    onlyProps_num: 123,
  },
  computed: {
    _onlyProps_xxx() {
      void 0;
    },
    // @ts-expect-error 只可写内部字段
    onlyProps_yyy() {
      void 0;
    },
  },
});

// 3 类型错误
CustomComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    onlyProps_str: "wxml",
  },
  computed: {
    // @ts-expect-error  类型错误
    onlyProps_num() {
      return "string";
    },
  },
});
// 4 与data的内部字段重复
CustomComponent<{}, OnlyPropsCompDoc>()({
  data: {
    _onlyProps_fff: 123,
  },
  computed: {
    // @ts-expect-error 与data的内部字段重复
    _onlyProps_fff(): number {
      return 123;
    },
  },
});
// 5 与store的内部字段重复
CustomComponent<{}, OnlyPropsCompDoc>()({
  store: {
    _onlyProps_ccc: () => 123,
  },
  computed: {
    // @ts-expect-error 与store的内部字段重复
    _onlyProps_ccc(): number {
      return 123;
    },
  },
});
// 6 与root字段重复
CustomComponent<{ data: { _onlyProps_ccc: 123 } }, OnlyPropsCompDoc>()({
  computed: {
    // @ts-expect-error 与data的内部字段重复
    _onlyProps_ccc(): number {
      return 123;
    },
  },
});

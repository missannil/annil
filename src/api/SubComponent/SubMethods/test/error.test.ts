import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type { Bubbles } from "../../../RootComponent/CustomEvents/CustomEventsTag";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type RootDoc = RootComponentDoc<{
  methods: {
    Mstr: () => string;
  };
  events: {
    Estr: () => string;
  };
  customEvents: {
    Cstr: string;
  };
}>;

type CompDoc = ComponentDoc<{
  customEvents: {
    aaa_str: string | Bubbles;
  };
}>;

// 1 前缀错误
SubComponent<RootDoc, CompDoc>()({
  methods: {
    // @ts-expect-error 1.1 前缀错误
    xxx_yyy() {},
  },
});

// 2 重复检测
SubComponent<RootDoc, CompDoc>()({
  events: {
    aaa_str_catch() {
    },
  },
  methods: {
    // @ts-expect-error 2.1 与组件自定义事件字段重复
    aaa_str() {},
    // @ts-expect-error 2.2 与events字段重复
    aaa_str_catch() {
    },
  },
});

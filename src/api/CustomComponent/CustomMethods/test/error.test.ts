import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import type { Bubbles } from "../../../RootComponent/CustomEvents/CustomEventsTag";
import type { RootComponentType } from "../../../RootComponent/RootComponentType";
import { CustomComponent } from "../..";

type RootDoc = RootComponentType<{
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

type CompDoc = ComponentType<{
  customEvents: {
    aaa_str: string | Bubbles;
  };
}>;

// 1 前缀错误
CustomComponent<RootDoc, CompDoc>()({
  methods: {
    // @ts-expect-error 1.1 前缀错误
    xxx_yyy() {
      void 0;
    },
  },
});

// 2 重复检测
CustomComponent<RootDoc, CompDoc>()({
  events: {
    aaa_str_catch() {
      void 0;
    },
  },
  methods: {
    // @ts-expect-error 2.1 与组件自定义事件字段重复
    aaa_str() {
      void 0;
    },
    // @ts-expect-error 2.2 与events字段重复
    aaa_str_catch() {
      void 0;
    },
  },
});

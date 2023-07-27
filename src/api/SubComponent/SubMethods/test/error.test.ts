import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
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
    aaa_str: string;
  };
}>;

// 前缀错误
SubComponent<RootDoc, CompDoc>()({
  methods: {
    // @ts-expect-error 前缀错误
    xxx_yyy() {},
  },
});

// 与组件事件字段重复
SubComponent<RootDoc, CompDoc>()({
  methods: {
    // @ts-expect-error 与组件事件字段重复
    aaa_str() {},
  },
});

import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import type { Bubbles } from "../../../RootComponent/CustomEvents/CustomEventsTag";
import { SubComponent } from "../..";

type CompDoc = ComponentType<{
  properties: {
    aaa_str: string;
  };
}>;

// 组件文档无自定义事件时,events字段类型为EmptyObject
SubComponent<{}, CompDoc>()({
  events: {
    // @ts-expect-error 非法字段
    xxx: 123,
  },
});

type CompDoc1 = ComponentType<{
  customEvents: {
    aaa_str: string | Bubbles;
  };
}>;

// 非法字段检测 组件文档有自定义事件时,events下的字段仅可写文档包含字段
SubComponent<{}, CompDoc1>()({
  events: {
    aaa_str(e) { // ok
      void e;
    },
    // @ts-expect-error 非法字段
    aaa_other() {
      void 0;
    },
  },
});

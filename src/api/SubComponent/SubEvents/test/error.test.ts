import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import { SubComponent } from "../..";

type CompDoc = ComponentDoc<{
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

type CompDoc1 = ComponentDoc<{
  customEvents: {
    aaa_str: string;
  };
}>;

// 组件文档有自定义事件时,events下的字段仅可写文档包含字段
SubComponent<{}, CompDoc1>()({
  events: {
    aaa_str(e) {
      e;
    }, // ok
    // @ts-expect-error 非法字段
    aaa_other() {},
  },
});

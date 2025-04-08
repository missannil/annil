import type { Wm } from "../../../..";
import { CustomComponent } from "../..";

// 测试1
CustomComponent<{ events: { a: string } }, Wm.View>()({
  watch: {
    // @ts-expect-error 无可监控字段时，约束为EmptyObject,不可写任何字段
    nothing() {
      void 0;
    },
  },
});

/**
 * 测试2  超出约束字段报错
 */
CustomComponent<{ events: { a: string } }, Wm.View>()({
  data: {
    view_hoverClass: " h-100",
  },
  watch: {
    view_hoverClass(newValue, oldValue) { // ok
      console.log(newValue, oldValue);
    },
    // @ts-expect-error 超出约束字段错误
    view_xxxhoverClass() {
      // do something
    },
  },
});
CustomComponent<{ data: { user: null | object } }, Wm.View>()({
  data: {
    view_hoverClass: " h-100",
  },
  watch: {
    view_hoverClass(newValue, oldValue) { // ok
      console.log(newValue, oldValue);
    },
    // @ts-expect-error 超出约束字段错误
    view_xxxhoverClass() {
      // do something
    },
  },
});
/**
 * 3  对象联合null的类型 不能watch子字段
 */
CustomComponent<{ data: { user: null | object } }, { properties: { a: number } }>()({
  watch: {
    user(newValue, oldValue) {
      void oldValue;
      void newValue;
    },
    // @ts-expect-error 不能watch子字段 因为user可能为null
    "user.name"(newValue, oldValue) {
      void oldValue;
      void newValue;
    },
  },
});

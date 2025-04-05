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

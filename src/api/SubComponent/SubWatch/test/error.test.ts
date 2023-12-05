import type { Wm } from "../../../..";
import { SubComponent } from "../..";

// 测试1
SubComponent<{ events: { a: string } }, Wm.View>()({
  watch: {
    // @ts-expect-error 无可监控字段时，约束为EmptyObject,不可写任何字段
    nothing() {},
  },
});

/**
 * 测试2  超出约束字段报错
 */
SubComponent<{ events: { a: string } }, Wm.View>()({
  data: {
    view_style: "",
  },
  watch: {
    view_style(newValue, oldValue) { // ok
      newValue;

      oldValue;
    },
    // @ts-expect-error 超出约束字段错误
    view_XXstyle() {
    },
  },
});

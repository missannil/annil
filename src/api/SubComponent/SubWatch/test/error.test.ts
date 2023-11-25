import type { Wm } from "../../../../thirdLib";
import { SubComponent } from "../..";

// 测试1
SubComponent<{ events: { a: string } }, Wm.View>()({
  watch: {
    // @ts-expect-error 无可监控字段时，约束为EmptyObject,不可写任何字段
    xxx() {},
  },
});

/**
 * 测试2  超出约束字段报错
 */
SubComponent<{ events: { a: string } }, Wm.View>()({
  data: {
    // @ts-expect-error 超出字段报错
    view_classdd: "",
  },
});

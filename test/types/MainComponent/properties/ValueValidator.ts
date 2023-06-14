import { MainComponent } from "../../../../src/api/MainComponent";

// ----------------重复字段验证----------------
/**
 * 与inject重复类型 对象类型
 */
MainComponent({
  properties: {
    ok: {
      type: Number,
      value: 123,
    },
    ok1: {
      type: Number,
      value: 123,
      optionalTypes: [String],
    },
    number: {
      type: Number,
      // @ts-expect-error 类型错误
      value: "应该写number类型",
    },
    union: {
      type: Number,
      // @ts-expect-error 类型错误
      value: "应该写number类型",
      optionalTypes: [String],
    },
  },
});

import { MainComponent } from "../../../../src/index";

/**
 * 测试: properties字面量约束
 */
MainComponent({
  properties: {
    a: {
      type: String,
      // @ts-expect-error   错误字段 "values"多了s
      values: "123",
    },
    bool: {
      type: Boolean,
      value: true,
      // @ts-expect-error   错误字段 optionalType少了s
      optionalType: [String],
    },
    other: {
      type: Number,
      value: 123,
      optionalTypes: [String],
      // @ts-expect-error   错误字段
      observable: "",
    },
  },
});

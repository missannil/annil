import { MainComponent } from "../../../../index";

/**
 * properties 非法字段测试
 */
MainComponent({
  properties: {
    // a: {
    //   type: String,
    //   // @ts-expect-error   错误字段 "values"多了s
    //   values: "123",
    // },
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

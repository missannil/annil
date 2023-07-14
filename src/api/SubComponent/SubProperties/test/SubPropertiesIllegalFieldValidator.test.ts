import { SubComponent } from "../..";

/**
 * properties 非法字段测试
 */
SubComponent()({
  properties: {
    bool: {
      type: Boolean,
      value: true,
      // @ts-expect-error   非法字段 optionalType少了s
      optionalType: [String],
    },
    other: {
      type: Number,
      value: 123,
      optionalTypes: [String],
      // @ts-expect-error   非法字段
      observable: "",
    },
  },
});

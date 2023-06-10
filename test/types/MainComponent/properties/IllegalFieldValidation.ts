import { MainComponent } from "../../../../src/index";

/**
 * 非法字段检测
 */
MainComponent({
  properties: {
    a: {
      type: String,
      // @ts-expect-error  "非法字段 types"
      values: "123",
    },
    bool: {
      type: Boolean,
      value: true,
      // @ts-expect-error  "非法字段 optionalType"
      optionalType: [String],
    },
    other: {
      type: Number,
      // @ts-expect-error  "非法字段 observers"
      observable: "",
    },
  },
});

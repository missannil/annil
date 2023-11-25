import { RootComponent, type SpecificType } from "../../../../index";
import type { Mock_Cart } from "./normalRequired";

// 1 非法字段
RootComponent()({
  properties: {
    num: {
      type: Number,
      // @ts-expect-error   非法字段 values多了`s`
      values: 123,
    },
    bool: {
      type: Boolean,
      value: true,
      // @ts-expect-error   非法字段 optionalType少了`s`
      optionalType: [String],
    },
    union: {
      type: Number,
      value: 123,
      optionalTypes: [String],
      // @ts-expect-error   非法字段 observable
      observable: "",
    },
  },
});

// 2 value 类型错误
RootComponent()({
  properties: {
    str: {
      type: String,
      // @ts-expect-error 类型错误
      value: 123,
    },
    optionalObj: {
      // @ts-expect-error 可选对象value若写null,需要先定义
      type: Object as SpecificType<Mock_Cart>,
      // @ts-expect-error 可选对象value若写null,需要先定义
      value: null,
    },
    str_num: {
      type: String,
      // @ts-expect-error 类型错误 应该写type字段类型(string)而非optionalTypes中的类型
      value: 123,
      optionalTypes: [Number],
    },
  },
});

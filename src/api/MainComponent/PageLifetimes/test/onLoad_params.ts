import type { Test } from "hry-types";
import { Checking } from "hry-types";
import type { SpecificType } from "../../../../types/SpecificType";
import { MainComponent } from "../..";

/**
 * 页面onLoad参数类型测试
 */
MainComponent({
  isPage: true,
  properties: {
    str: String,
    num: Number as SpecificType<0 | 1>,
    obj: Object,
    union: {
      type: Object,
      optionalTypes: [Number],
    },
    optional: {
      type: Object,
      value: { a: 123 },
    },
  },
  pageLifetimes: {
    onLoad(props) {
      Checking<string, typeof props.str, Test.Pass>;

      Checking<0 | 1, typeof props.num, Test.Pass>;

      Checking<object | number, typeof props.union, Test.Pass>;

      Checking<object, typeof props.optional, Test.Pass>; // 不带null是对的
    },
  },
});

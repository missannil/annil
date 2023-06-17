import { type AnyObject, ValueChecking } from "hry-types";
import type { SpecificType } from "../../../../common_types/SpecificType";
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
      ValueChecking<string>()(props.str);
      ValueChecking<0 | 1>()(props.num);
      ValueChecking<AnyObject | number>()(props.union);
      ValueChecking<AnyObject>()(props.optional); // 不带null是对的
    },
  },
});

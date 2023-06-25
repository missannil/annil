import { type AnyObject, ValueChecking } from "hry-types";
import { MainComponent, type SpecificType } from "../../../..";
import type { Mock_User } from "../../Properties/test/PropertiesConstraint.test";

/**
 * 页面时
 */
MainComponent({
  isPage: true,
  properties: {
    str: String,
    obj: Object,
    union: {
      type: Object as SpecificType<Mock_User>,
      value: { id: "001", name: "zhao" },
    },
  },

  pageLifetimes: {
    onLoad(props) {
      ValueChecking<string>()(props.str);

      ValueChecking<AnyObject>()(props.obj);

      ValueChecking<Mock_User>()(props.union);
    },
    onHide() {
      console.log("onHide");
    },
    // @ts-expect-error 不可写lifetimes字段
    lifetimes: {},
  },
});

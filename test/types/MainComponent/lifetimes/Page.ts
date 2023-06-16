import { type AnyObject, ValueChecking } from "hry-types";
import { MainComponent, type SpecificType } from "../../../../src";
import type { Mock_User } from "../../mockData";

MainComponent({
  properties: {
    str: String,
    obj: Object,
    union: {
      type: Object as SpecificType<Mock_User>,
      value: { id: "001", name: "zhao" },
    },
  },
  isPage: true,
  pageLifetimes: {
    onLoad(props) {
      ValueChecking<string>()(props.str);
      ValueChecking<AnyObject>()(props.obj);
      ValueChecking<Mock_User>()(props.union);
    },
    onHide() {
      console.log("onHide");
    },
    // ...
  },
});

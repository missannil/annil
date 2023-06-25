import type { SpecificType } from "../../../..";
import { MainComponent } from "../..";
import type { Mock_Cart } from "../../Properties/test/PropertiesConstraint.test";

/**
 * 可关联properties字段
 */
MainComponent({
  properties: {
    num: Number,
    literal: {
      type: String as SpecificType<"male" | "female">,
      value: "male",
    },
    obj: Object as SpecificType<Mock_Cart>,
  },
  computed: {
    Cnum() {
      return this.data.num + 10;
    },
    CLiteral() {
      return this.data.literal;
    },
    CObj() {
      return this.data.obj?.id || "name is undefined";
    },
  },
});

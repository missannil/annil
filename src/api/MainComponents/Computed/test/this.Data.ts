import { type AnyObject, ValueChecking } from "hry-types";
import type { Mock_User } from "../../../../common_types/mockData";
import type { SpecificType } from "../../../../common_types/SpecificType";
import { MainComponent } from "../..";

/**
 * compute字段函数中的this.data类型测试
 */
MainComponent({
  properties: {
    aaa: String,
    obj: Object,
    union_obj: {
      type: Object as SpecificType<Mock_User>,
      optionalTypes: [Number],
    },
    union_obj1: {
      type: Number,
      optionalTypes: [Object as SpecificType<Mock_User>],
    },
    optinal: {
      type: String,
      value: "123",
    },
  },
  data: {
    bbb: 123,
  },
  computed: {
    yyy() {
      ValueChecking<string>()(this.data.aaa);
      ValueChecking<AnyObject | null>()(this.data.obj);
      ValueChecking<Mock_User | number | null>()(this.data.union_obj);
      ValueChecking<Mock_User | number>()(this.data.union_obj1);
      ValueChecking<string>()(this.data.optinal);
      ValueChecking<number>()(this.data.bbb);
      ValueChecking<"123">()(this.data.zzz);

      return 123;
    },
    zzz() {
      ValueChecking<string>()(this.data.aaa);
      ValueChecking<number>()(this.data.bbb);
      ValueChecking<123>()(this.data.yyy);

      return "123";
    },
  },
});

import { type AnyObject, ValueChecking } from "hry-types";
import type { SpecificType } from "../../../../src";
import { MainComponent } from "../../../../src/api/MainComponent";
import type { Mock_User } from "../../mockData";

// ----------------computed中的this.data----------------
/**
 * 与inject重复类型 对象类型
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

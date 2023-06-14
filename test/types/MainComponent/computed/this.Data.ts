import { ValueChecking } from "hry-types";
import { MainComponent } from "../../../../src/api/MainComponent";

// ----------------computed中的this.data----------------
/**
 * 与inject重复类型 对象类型
 */
MainComponent({
  properties: {
    aaa: String,
  },
  data: {
    bbb: 123,
  },
  computed: {
    yyy() {
      ValueChecking<string>()(this.data.aaa);
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

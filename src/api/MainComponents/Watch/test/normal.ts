import { ValueChecking } from "hry-types";
import { MainComponent } from "../..";

MainComponent({
  properties: {
    a: String,
  },
  data: {
    b: 123,
  },
  computed: {
    c() {
      return this.data.b;
    },
  },
  watch: {
    a(oldValue, newValue) {
      ValueChecking<string>()(oldValue);
      ValueChecking<string>()(newValue);
    },
    b(oldValue, newValue) {
      ValueChecking<number>()(oldValue);
      ValueChecking<number>()(newValue);
    },
    // 计算属性参数类型提示中有,或者自己写,默认为unknown
    c(oldValue: number, newValue: number) {
      ValueChecking<number>()(oldValue);
      ValueChecking<number>()(newValue);
    },
  },
});

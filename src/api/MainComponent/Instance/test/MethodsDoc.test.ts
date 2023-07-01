import { ValueChecking } from "hry-types";
import { MainComponent } from "../..";

MainComponent({
  methods: {
    M1() {
      ValueChecking<() => "str">()(this.M2);

      return 123;
    },
    M2() {
      ValueChecking<() => 123>()(this.M1);

      return "str";
    },
  },
  lifetimes: {
    attached() {
      ValueChecking<() => "str">()(this.M2);

      ValueChecking<() => 123>()(this.M1);
    },
  },
});

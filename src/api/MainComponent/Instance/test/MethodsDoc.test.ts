import { Checking, type Test } from "hry-types";
import { MainComponent } from "../..";

MainComponent({
  methods: {
    M1() {
      Checking<() => "str", typeof this.M2, Test.Pass>;

      return 123;
    },
    M2() {
      Checking<() => 123, typeof this.M1, Test.Pass>();

      return "str";
    },
  },
  lifetimes: {
    attached() {
      Checking<() => "str", typeof this.M2, Test.Pass>;

      Checking<() => 123, typeof this.M1, Test.Pass>();
    },
  },
});

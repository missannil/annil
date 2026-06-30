import { Checking, type Test } from "hry-types";
import { RootComponent } from "../../../../..";

RootComponent()({
  methods: {
    // 与注入方法同名,会覆盖注入方法
    injectMethodB(num: string) {
      return num;
    },

    M1() {
      return 1;
    },

    M2(str: string) {
      Checking<typeof this.M1, () => 1, Test.Pass>();

      Checking<typeof this.M2, (str: string) => string, Test.Pass>();

      Checking<typeof this.injectMethodA, (str: string) => string, Test.Pass>();
      // 自身方法会覆盖注入方法,所以类型为自身方法的类型
      Checking<typeof this.injectMethodB, (num: string) => string, Test.Pass>();

      return str;
    },
  },
});

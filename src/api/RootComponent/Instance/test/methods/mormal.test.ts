import { RootComponent } from "../../../../..";
import { typeEqual } from "../../../../../utils/typeEqual";

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
      typeEqual<typeof this.M1, () => 1>();

      typeEqual<typeof this.M2, (str: string) => string>();

      typeEqual<typeof this.injectMethodA, (str: string) => string>();
      // 自身方法会覆盖注入方法,所以类型为自身方法的类型
      typeEqual<typeof this.injectMethodB, (num: string) => string>();

      return str;
    },
  },
});

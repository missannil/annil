import { RootComponent } from "../../../../..";

RootComponent()({
  methods: {
    M1() {
      return 1;
    },

    M2() {
      // @ts-expect-error 不可调用不存在的方法
      this.M3();
    },
  },
});

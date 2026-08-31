/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../utils/typeEqual";
import { RootComponent } from "../../RootComponent";

// 1. 注入字段无重复时
RootComponent()({
  methods: {
    testInjectTypes() {
      typeEqual<typeof this.data.injectStr, string>;

      typeEqual<typeof this.data.injectTheme, "dark" | "light" | undefined>;

      typeEqual<typeof this.injectMethodA, (data: string) => string>;
    },
  },
});

// 2. 注入字段重复时,自身覆盖注入类型
RootComponent()({
  data: {
    // 覆盖注入的数据类型,注入的类型为string。
    injectStr: 123,
  },
  store: {
    // 覆盖注入的数据类型,注入的类型为"dark" | "light" | undefined。
    injectTheme: () => "aaa",
  },
  methods: {
    // 覆盖注入的方法类型
    injectMethod() {
      return 123;
    },
    testInjectTypes() {
      // 覆盖注入的数据类型,注入的类型为string。
      typeEqual<typeof this.data.injectStr, number>;
      // 覆盖注入的数据类型,注入的类型为"dark" | "light" | undefined。
      typeEqual<typeof this.data.injectTheme, string>;

      typeEqual<typeof this.injectMethod, () => 123>;
    },
  },
});

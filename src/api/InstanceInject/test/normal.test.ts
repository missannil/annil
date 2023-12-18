import { Checking, Test } from "hry-types";
import { RootComponent } from "../../RootComponent";

// 1. 注入字段无重复时
RootComponent()({
  methods: {
    testInjectTypes() {
      Checking<typeof this.data.injectStr, string, Test.Pass>;

      Checking<typeof this.data.injectTheme, "dark" | "light" | undefined, Test.Pass>;

      Checking<typeof this.injectMethod, (data: string) => string, Test.Pass>;
    },
  },
});

// 2. 注入字段重复时,自身覆盖注入类型
RootComponent()({
  data: {
    // 覆盖注入的数据类型
    injectStr: 123,
  },
  store: {
    // 覆盖注入的数据类型
    injectTheme: (() => "aaa") as () => "aaa",
  },
  methods: {
    // 覆盖注入的方法类型
    injectMethod() {
      return 123;
    },
    testInjectTypes() {
      Checking<typeof this.data.injectStr, number, Test.Pass>;

      Checking<typeof this.data.injectTheme, "aaa", Test.Pass>;

      Checking<typeof this.injectMethod, () => 123, Test.Pass>;
    },
  },
});

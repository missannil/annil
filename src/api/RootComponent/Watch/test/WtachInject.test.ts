import { Checking, type Test } from "hry-types";
import { RootComponent } from "../..";

/**
 * watch 只能监控 注入的store字段
 */
RootComponent()({
  watch: {
    injectTheme(newValue, oldValue) {
      Checking<"dark" | "light" | undefined, typeof newValue, Test.Pass>;

      Checking<"dark" | "light" | undefined, typeof oldValue, Test.Pass>;
    },
  },
});

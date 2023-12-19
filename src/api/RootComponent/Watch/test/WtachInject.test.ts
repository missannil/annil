import { Checking, Test } from "hry-types";
import { RootComponent } from "../..";

/**
 * watch data字段 深度只读
 */
RootComponent()({
  watch: {
    injectStr(newValue, oldValue) {
      Checking<string, typeof newValue, Test.Pass>;

      Checking<string, typeof oldValue, Test.Pass>;
    },
    injectTheme(newValue, oldValue) {
      Checking<"dark" | "light" | undefined, typeof newValue, Test.Pass>;

      Checking<"dark" | "light" | undefined, typeof oldValue, Test.Pass>;
    },
  },
});

import { Checking, type Test } from "hry-types";
import { CustomComponent } from "../..";

/**
 * watch  注入的store字段
 */
CustomComponent<{}, { properties: { aaa_num: number } }>()({
  watch: {
    injectTheme(newValue, oldValue) {
      void Checking<"dark" | "light" | undefined, typeof newValue, Test.Pass>;

      void Checking<"dark" | "light" | undefined, typeof oldValue, Test.Pass>;
      void oldValue;
    },
  },
});

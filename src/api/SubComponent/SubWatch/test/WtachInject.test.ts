import { Checking, type Test } from "hry-types";
import { SubComponent } from "../..";

/**
 * watch  注入的store字段
 */
SubComponent<{}, { properties: { aaa_num: number } }>()({
  watch: {
    injectTheme(newValue, oldValue) {
      void Checking<"dark" | "light" | undefined, typeof newValue, Test.Pass>;

      void Checking<"dark" | "light" | undefined, typeof oldValue, Test.Pass>;
      void oldValue;
    },
  },
});

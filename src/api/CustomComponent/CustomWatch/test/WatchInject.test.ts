import { typeEqual } from "../../../../utils/typeEqual";
import { CustomComponent } from "../..";

/**
 * watch  注入的store字段
 */
CustomComponent<{}, { properties: { aaa_num: number } }>()({
  watch: {
    injectTheme(newValue, oldValue) {
      void typeEqual<"dark" | "light" | undefined, typeof newValue>;

      void typeEqual<"dark" | "light" | undefined, typeof oldValue>;
      void oldValue;
    },
  },
});

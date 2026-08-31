import { typeEqual } from "../../../../utils/typeEqual";
import { RootComponent } from "../..";
/**
 * watch 只能监控 注入的store字段
 * 注入文件 https://github.com/missannil/annil/blob/main/src/api/InstanceInject/inject.ts
 */
RootComponent()({
  watch: {
    injectTheme(newValue, oldValue) {
      void oldValue;
      void typeEqual<"dark" | "light" | undefined, typeof newValue>;

      void typeEqual<"dark" | "light" | undefined, typeof oldValue>;
    },
  },
});

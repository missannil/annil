import { Checking, type Test } from "hry-types";
import { RootComponent } from "../..";
/**
 * watch 只能监控 注入的store字段
 * 注入文件 https://github.com/missannil/annil/blob/main/src/api/InstanceInject/inject.ts
 */
RootComponent()({
  watch: {
    injectTheme(newValue, oldValue) {
      void oldValue;
      void Checking<"dark" | "light" | undefined, typeof newValue, Test.Pass>;

      void Checking<"dark" | "light" | undefined, typeof oldValue, Test.Pass>;
    },
  },
});

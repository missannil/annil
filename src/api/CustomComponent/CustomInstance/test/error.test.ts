import type { View } from "../../../../thirdLib/wm";
import type { RootComponentDefinition } from "../../../RootComponent/returnType";
import { CustomComponent } from "../..";

type RootDoc = RootComponentDefinition<{
  events: {
    RootE1: () => string;
  };
}>;

// 实例中只存在RootDoc和自身的methods字段
CustomComponent<RootDoc, View>()({
  lifetimes: {
    created() {
      // @ts-expect-error 不存在的方法  (Root事件方法不可调用)
      this.RootE1();

      // @ts-expect-error 不存在的方法
      this.otherMethods();
    },
  },
});

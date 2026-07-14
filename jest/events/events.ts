import { CustomComponent, DefineComponent, RootComponent } from "../../src";
import type { CompDoc } from "../common";

const subA = CustomComponent<Root, CompDoc>()({
  data: {
    compA_num: 123,
    compA_user: { name: "zhao" },
  },
  events: {
    compA_str() {
      void 0;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    id: "",
  },
  events: {
    onTap() {
      void 0;
    },
  },
  lifetimes: {
    attached() {
      // @ts-ignore 模拟触发事件
      this.onTap("rootEvent-onTap");

      // @ts-ignore 模拟触发事件
      this.compA_str("subEvent-compA");
    },
  },
});

DefineComponent({
  name: "events",
  rootComponent,
  subComponents: [subA],
});

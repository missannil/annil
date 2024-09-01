import { DefineComponent, RootComponent, SubComponent } from "../../src";
import type { CompDoc } from "../common";

const subA = SubComponent<Root, CompDoc>()({
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
  customEvents: {
    debounceEvent: {
      detail: undefined,
      debounce: 1000,
    },
    throttleEvent: {
      detail: undefined,
      throttle: 1000,
    },
  },
  lifetimes: {
    attached() {
      // @ts-ignore 模拟触发事件  触发1次 为了测试代码覆盖率
      this.debounceEvent("debounceEvent-first");

      // @ts-ignore 模拟触发事件  触发2次 为了测试代码覆盖率
      this.debounceEvent("debounceEvent-second");

      // @ts-ignore 模拟触发事件  触发1次 为了测试代码覆盖率
      this.throttleEvent("throttleEvent-first");

      // @ts-ignore 模拟触发事件  触发2次 为了测试代码覆盖率
      this.throttleEvent("throttleEvent-second");
    },
  },
});

DefineComponent({
  name: "events",
  rootComponent,
  subComponents: [subA],
});

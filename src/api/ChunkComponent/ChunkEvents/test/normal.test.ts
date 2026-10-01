import { RootComponent } from "../../../../";
import { ChunkComponent } from "../..";

const rootComponent = RootComponent()({
  customEvents: {
    rootCustomEvent: String,
    rootBubbleComposed: {
      detail: String,
      options: {
        bubbles: true,
        composed: true,
      },
    },
  },
  events: {
    rootEvent() {
      void 0;
    },
  },
  methods: {
    rootMethod() {
      void 0;
    },
  },
});
void rootComponent;

ChunkComponent<typeof rootComponent, "actual">()({
  events: {
    actual_test() {
      // 可以调用根组件的方法
      this.rootMethod();
      // 可以调用根组件自定义事件
      this.rootCustomEvent("detail");
      this.rootBubbleComposed("detail");
    },
  },
});

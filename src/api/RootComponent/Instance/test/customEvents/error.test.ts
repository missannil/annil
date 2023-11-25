import { RootComponent } from "../../../../..";

RootComponent()({
  customEvents: {
    eventA: String,
  },
  methods: {
    test() {
      // @ts-expect-error 不可调用不存在的自定义事件
      this.eventB();
    },
  },
});

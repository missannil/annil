import { DefineComponent, RootComponent } from "../../src";

const rootComponent = RootComponent()({
  data: {
    num: 123,
  },
  computed: {
    test() {
      return this.data.num;
    },
  },
});

DefineComponent({
  name: "injectNormal",
  rootComponent,
});

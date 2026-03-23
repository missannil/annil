import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import { DefineComponent, RootComponent, typeEqual } from "../../src";

const rootComponent = RootComponent()({
  data: {
    attached: false,
    num: 123,
  },
  computed: {
    test() {
      return this.data.num;
    },
  },
});

const test = DefineComponent({
  name: "test",
  rootComponent,
});
typeEqual<EmptyObject>(test);

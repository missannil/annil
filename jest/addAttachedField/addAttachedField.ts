// annil disable unusedData
// annil disable suggestInternalData
import { DefineComponent, RootComponent } from "../../src";

const rootComponent = RootComponent()({
  data: {
    num: 123,
  },
  computed: {
    // annil disable unusedData
    test() {
      return this.data.num;
    },
  },
});

DefineComponent({
  name: "injectNormal",
  rootComponent,
});

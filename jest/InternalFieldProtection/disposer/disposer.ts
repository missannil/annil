// annil disable unusedData
// annil disable suggestInternalData
import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  methods: {
    disposer() {
      // ...
    },
  },
});
const compA = DefineComponent({
  name: "/compA",
  rootComponent,
});
export type $CompA = typeof compA;
void compA;

import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  data: {
    __computedCache__: 1,
  },
});
const compA = DefineComponent({
  name: "/compA",
  rootComponent,
});
export type $CompA = typeof compA;
void compA;

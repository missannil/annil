import { CustomComponent, DefineComponent, RootComponent } from "../../../src";
import { mockFn } from "./DemoA.test";

const A = Behavior({
  lifetimes: {
    attached() {
      mockFn("subA");
    },
  },
});
const B = Behavior({
  lifetimes: {
    attached() {
      mockFn("subB");
    },
  },
});
const Root = Behavior({
  lifetimes: {
    attached() {
      mockFn("Root");
    },
  },
});
const subA = CustomComponent()({
  behaviors: [A],
});
const subB = CustomComponent()({
  behaviors: [B],
});
const rootComponent = RootComponent()({
  behaviors: [Root],
});

DefineComponent({
  name: "customeTest",
  rootComponent,
  subComponents: [subA, subB],
});

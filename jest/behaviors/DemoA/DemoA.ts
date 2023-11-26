import { DefineComponent, RootComponent, SubComponent } from "../../../src";
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
const subA = SubComponent()({
  behaviors: [A],
});
const subB = SubComponent()({
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

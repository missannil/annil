import { DefineComponent, RootComponent, type SpecificType } from "../../src";
import type { User } from "../common";

const rootComponent = RootComponent()({
  customEvents: {
    str: String,
    union: {
      detailType: [Array as SpecificType<string[]>, Object as SpecificType<User>],
      options: { bubbles: true },
    },
  },
  lifetimes: {
    attached() {
      this.str("string");

      this.union(["a", "b", "c"]);
    },
  },
});

DefineComponent({
  name: "customeTest",
  rootComponent,
});

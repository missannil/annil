import { DefineComponent, type DetailedType, RootComponent } from "../../src";
import type { User } from "../common";

const rootComponent = RootComponent()({
  customEvents: {
    str: String,
    union: {
      detail: [Array as DetailedType<string[]>, Object as DetailedType<User>],
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

import { DefineComponent, type DetailedType, RootComponent } from "../../src";
import type { User } from "../common";

const rootComponent = RootComponent()({
  customEvents: {
    str: String,
    union: {
      detail: [Array as DetailedType<string[]>, Object as DetailedType<User>],
      options: { bubbles: true },
    },
    null: null,
    nothing: undefined,
  },
  lifetimes: {
    attached() {
      this.str("string");

      this.union(["a", "b", "c"]);

      this.nothing();

      this.null(null);
    },
  },
});

DefineComponent({
  name: "customeTest",
  rootComponent,
});

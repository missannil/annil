import type { User } from "../../jest/common";
import { DefineComponent, type DetailedType, RootComponent } from "../../src";

const rootComponent = RootComponent()({
  properties: {
    user: Object as DetailedType<User>,
  },
  computed: {
    age() {
      return this.data.user?.age || 0;
    },
  },
});

const compA = DefineComponent({
  name: "subA",
  rootComponent,
  subComponents: [],
});

export type CompA = typeof compA;

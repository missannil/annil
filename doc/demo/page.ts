import type { User } from "../../jest/common";
import { DefineComponent, RootComponent, type SpecificType, SubComponent } from "../../src";
import type { CompA } from "./componentA";

const compA = SubComponent<RootDoc, CompA>()({
  computed: {
    subA_user() {
      return this.data.user;
    },
  },
});

type RootDoc = typeof rootComponent;

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    user: Object as SpecificType<User>,
  },
  computed: {
    age() {
      return this.data.user.age;
    },
  },
});

DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [compA],
});

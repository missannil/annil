import type { User } from "../../jest/common";
import { DefineComponent, type DetailedType, RootComponent } from "../../src";

// const subB = SubComponent<RootDoc, { properties: { subA_name: string; subA_age: number } }>()({
//   computed: {
//     subA_name() {
//       return this.data.user?.name;
//     },
//     subA_age() {
//       return this.data.user.age;
//     },
//   },
// });

// type RootDoc = typeof rootComponent;

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

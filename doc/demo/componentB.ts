import { DefineComponent, RootComponent, type SpecificType } from "../../src";

const rootComponent = RootComponent()({
  properties: {
    _age: Number as SpecificType<number>,
  },
  computed: {
    age() {
      return this.data._age;
    },
  },
});

const compB = DefineComponent({
  name: "subB",
  rootComponent,
  subComponents: [],
});

export type CompA = typeof compB;

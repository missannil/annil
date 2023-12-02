import { DefineComponent, type DetailedType, RootComponent } from "../../src";

const rootComponent = RootComponent()({
  properties: {
    _age: Number as DetailedType<number>,
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

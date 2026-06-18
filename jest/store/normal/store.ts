import { DefineComponent, RootComponent, SubComponent } from "../../../src";
import { storeUser } from "./store.test";

const chunk = SubComponent<Root, { properties: { chunk_age: number } }>()({
  store: {
    chunk_age: () => storeUser.age,
  },
});

const custom = SubComponent<Root, { properties: { custom_age: number } }>()({
  store: {
    custom_age: () => storeUser.age,
  },
});
type Root = typeof rootComponent;
const rootComponent = RootComponent()({
  store: {
    age: () => storeUser.age,
  },
});

DefineComponent({
  name: "test",
  rootComponent,
  subComponents: [custom, chunk],
});

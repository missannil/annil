import { ChunkComponent, CustomComponent, DefineComponent, RootComponent } from "../../src";
import { storeUser } from "./store.test";

const chunk = ChunkComponent<Root>()({
  store: {
    chunkAge: () => storeUser.age,
  },
});

const custom = CustomComponent<Root, { properties: { custom_age: number } }>()({
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

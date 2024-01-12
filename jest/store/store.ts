import { DefineComponent, RootComponent, SubComponent } from "../../src";
import { storeUser } from "./store.test";

const subA = SubComponent<typeof rootComponent, { properties: { aaa_name: string } }>()({
  store: {
    aaa_name: () => storeUser.name,
  },
  lifetimes: {
    attached() {
      storeUser.changeName("lili");
    },
  },
});
const rootComponent = RootComponent()({
  store: {
    age: () => storeUser.age,
  },
  lifetimes: {
    attached() {
      storeUser.changeAge();
    },
  },
});

DefineComponent({
  name: "test",
  rootComponent,
  subComponents: [subA],
});

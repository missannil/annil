import { DefineComponent, RootComponent, SubComponent } from "../../src";
import { storeUser } from "./store.test";

const subA = SubComponent<typeof rootComponent, { properties: { aaa_name: string } }>()({
  store: {
    aaa_name: () => storeUser.name,
  },
  lifetimes: {
    attached() {
      // console.log("subA attached", 1111111111111111);
      storeUser.changeName("lili");
      // console.log("subA attached", this.data.aaa_name);
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

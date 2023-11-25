import { DefineComponent, RootComponent, SubComponent } from "../../src";
import { user } from "./user";

const subA = SubComponent<typeof rootComponent, { properties: { aaa_name: string } }>()({
  store: {
    aaa_name: () => user.name,
  },
});
const rootComponent = RootComponent()({
  store: {
    age: () => user.age,
  },
});

DefineComponent({
  name: "test",
  rootComponent,
  subComponents: [subA],
});

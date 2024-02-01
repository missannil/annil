import { DefineComponent, type DetailedType, RootComponent, SubComponent } from "../../src";
import type { ComponentDoc } from "../../src/api/DefineComponent/ReturnType/ComponentDoc";
import { type User, user } from "../common";

type SubA = ComponentDoc<{
  properties: {
    aaa_str: string;
    aaa_num: number;
    aaa_user: User | null;
  };
}>;

const subA = SubComponent<Root, SubA>()({
  inherit: {
    aaa_str: "str",
  },
  data: {
    aaa_num: 123,
  },
  computed: {
    aaa_user() {
      return user;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    obj: Object as DetailedType<User>,
  },
  data: {
    str: "string",
    obj1: user,
  },
  computed: {
    obj2() {
      return user;
    },
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          str: "xxxx",
          obj1: { name: "zhao", age: 20 },
        });
      }, 200);
    },
  },
});

DefineComponent({
  name: "customeTest",
  rootComponent,
  subComponents: [subA],
});

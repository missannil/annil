import { CustomComponent, DefineComponent, RootComponent } from "../../../src";
import { type CompDoc } from "../../common";
import { obj, obj1 } from "./methodsOfPrototype.test";

const subA = CustomComponent<Root, CompDoc>()({
  data: {
    compA_num: 0,
  },
  computed: {
    _compA_in() {
      return "age" in this.data.user;
    },
    _compA_entries() {
      return Object.entries(this.data.user1);
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  store: {
    user: () => obj.user,
    user1: () => obj1.user,
  },

  computed: {
    hasAge() {
      return Reflect.has(this.data.user, "age");
    },
    keys() {
      return Object.keys(this.data.user1);
    },
    values() {
      return Object.values(this.data.user1);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

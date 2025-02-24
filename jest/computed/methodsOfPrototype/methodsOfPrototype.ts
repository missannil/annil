import { observable } from "mobx";
import { DefineComponent, RootComponent, SubComponent } from "../../../src";
import { type CompDoc } from "../../common";
type User = {
  name: string;
  age?: number;
};
const obj = observable({
  user: {
    name: "zhao",
    age: 30,
  } as User,
});
const obj1 = observable({
  user: {
    name: "zhao",
    age: 30,
  } as User,
});
const subA = SubComponent<Root, CompDoc>()({
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

  lifetimes: {
    attached() {
      setTimeout(() => {
        obj.user = { name: "zhao" };
      }, 200);
      setTimeout(() => {
        obj1.user = { name: "zhao" };
      }, 300);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

import { DefineComponent, RootComponent, type SpecificType, SubComponent } from "../../../src";

type User = { name: string; age: number };

const sub = SubComponent<Root, { properties: { aaa_num: number; aaa_user: User | null } }>()({
  data: {
    aaa_num: 123,
    aaa_user: { name: "zhao", age: 20 },
  },
  watch: {
    num(a, b) {
      this.data["sub-watch-num"] = [a, b];
    },
    user(a, b) {
      this.data["sub-watch-user"] = [a, b];
    },
    "user.name"(a, b) {
      this.data["sub-watch-user.name"] = [a, b];
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    num: Number,
    user: Object as SpecificType<User>,
  },

  watch: {
    num(a, b) {
      this.data["root-watch-num"] = [a, b];
    },
    user(a, b) {
      this.data["root-watch-user"] = [a, b];
    },
    "user.age"(a, b) {
      this.data["root-watch-user.age"] = [a, b];
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

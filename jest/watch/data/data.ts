import { DefineComponent, RootComponent, SubComponent } from "../../../src";

type User = { name: string; age: number };

const sub = SubComponent<Root, { properties: { sub_num: number; sub_user: User | null } }>()({
  data: {
    sub_num: <number> 123,
    sub_user: { name: "zhao", age: 20 },
  },
  watch: {
    num(a, b) {
      // @ts-ignore
      this.data["sub-watch-num"] = [a, b];
    },
    user(a, b) {
      // @ts-ignore
      this.data["sub-watch-user"] = [a, b];
    },
    sub_num(a, b) {
      // @ts-ignore
      this.data["sub-watch-sub_num"] = [a, b];
    },
    sub_user(a, b) {
      // @ts-ignore
      this.data["sub-watch-sub_user"] = [a, b];
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        sub_num: 456,
        sub_user: { name: "lili", age: 30 },
      });
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    num: 123,
    user: <User> { name: "zhao", age: 20 },
  },
  watch: {
    num(a, b) {
      // @ts-ignore
      this.data["root-watch-num"] = [a, b];
    },
    user(a, b) {
      // @ts-ignore
      this.data["root-watch-user"] = [a, b];
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        num: 456,
        user: { name: "lili", age: 30 },
      });
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

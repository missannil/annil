import { DefineComponent, RootComponent, SubComponent } from "../../../src";

type User = { name: string; age: number };

const sub = SubComponent<Root, { properties: { sub_num: number; sub_user: User | null } }>()({
  computed: {
    sub_num(): number {
      return this.data.num;
    },
    sub_user(): User {
      return this.data.user;
    },
  },
  watch: {
    sub_num(a: number, b: number) {
      // @ts-ignore
      this.data["sub-watch-num"] = [a, b];
    },
    sub_user(a: User, b: User) {
      // @ts-ignore
      this.data["sub-watch-user"] = [a, b];
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    num: 123,
    user: <User> { name: "zhao", age: 20 },
  },
  computed: {
    rootNum() {
      return this.data.num;
    },
    rootUser() {
      return this.data.user;
    },
  },
  watch: {
    rootNum(a: number, b: number) {
      // @ts-ignore
      this.data["root-watch-num"] = [a, b];
    },
    rootUser(a: User, b: User) {
      // @ts-ignore
      this.data["root-watch-user"] = [a, b];
    },
    "rootUser.name"(a: string, b: string) {
      // @ts-ignore
      this.data["root-watch-rootUser.name"] = [a, b];
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        num: 456,
        user: { name: "lili", age: 30 },
      });

      setTimeout(() => {
        this.setData({
          "user.name": "zhao",
        });
      }, 0);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

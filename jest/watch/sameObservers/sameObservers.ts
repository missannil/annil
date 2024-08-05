import { DefineComponent, RootComponent, SubComponent } from "../../../src";
import { newUser, oldUser } from "./sameObservers.test";

interface User {
  name: string;
  age: number;
}

const sub = SubComponent<Root, { properties: { sub_user: User | null } }>()({
  computed: {
    sub_user(): User {
      return this.data.user;
    },
  },
  observers: {
    // 注意修改user.age时会引起计算属性重新计算导致这里被触发
    sub_user(a: User) {
      // @ts-ignore
      this.data.observersSubUser = [a];
    },
    "sub_user.**"(a: User) {
      // @ts-ignore
      this.data["observersSubUser.**"] = [a];
    },
  },
  watch: {
    sub_user(a: User, b: User) {
      // @ts-ignore
      this.data.watchSubUser = [a, b];
    },
    "sub_user.**"(a: User, b: User) {
      // @ts-ignore
      this.data["watchSubUser.**"] = [a, b];
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    user: oldUser as User,
    observersUser: [],
    "observersUser.**": [],
    watchUser: [],
    "watchUser.**": [],
    observersSubUser: [],
    "observersSubUser.**": [],
    watchSubUser: [],
    "watchSubUser.**": [],
  },
  observers: {
    // 单独setData age 不会导致此处触发
    user(a) {
      // @ts-ignore
      this.data.observersUser = [a];
    },
    "user.**"(a) {
      // @ts-ignore
      this.data["observersUser.**"] = [a];
    },
  },
  watch: {
    user(a, b) {
      // @ts-ignore
      this.data.watchUser = [a, b];
    },
    "user.**"(a, b) {
      // @ts-ignore
      this.data["watchUser.**"] = [a, b];
    },
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          user: newUser,
        });
      }, 0);

      setTimeout(() => {
        this.setData({
          "user.age": 40,
        });
      }, 100);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

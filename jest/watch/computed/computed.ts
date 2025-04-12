import { CustomComponent, DefineComponent, type DetailedType, RootComponent } from "../../../src";

interface User {
  name: string;
  age: number;
}

const sub = CustomComponent<Root, { properties: { sub_num: number; sub_user: User | null } }>()({
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
  properties: {
    user: Object as DetailedType<User>, // user: { name: "zhao", age: 20 } as U
    num: {
      type: Number,
      value: 123,
    },
  },
  data: {
    watchCount: 0,
    "root-watch-num": [] as number[],
    "root-watch-rootNum": [] as number[],
    "root-watch-user": [] as User[],
    "root-watch-rootUser.name,num": [] as (string | number)[],
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
    num(a: number, b: number) {
      this.data["root-watch-num"] = [a, b];
    },
    rootNum(a: number, b: number) {
      this.data["root-watch-rootNum"] = [a, b];
    },
    rootUser(a: User, b: User) {
      this.data["root-watch-user"] = [a, b];
    },
    // @ts-ignore
    "rootUser.name,num"(a: string, b: string, c: number, d: number) {
      this.data["root-watch-rootUser.name,num"] = [a, b, c, d];
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

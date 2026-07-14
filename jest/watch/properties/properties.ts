import { CustomComponent, DefineComponent, type DetailedType, RootComponent } from "../../../src";

interface User {
  name: string;
  age: number;
}

const sub = CustomComponent<Root, { properties: { aaa_num: number; aaa_user: User | null } }>()({
  data: {
    aaa_num: 123,
    aaa_user: { name: "zhao", age: 20 },
  },
  watch: {
    // num(a, b) {
    //   // @ts-ignore
    //   this.data["sub-watch-num"] = [a, b];
    // },
    // user(a, b) {
    //   // @ts-ignore
    //   this.data["sub-watch-user"] = [a, b];
    // },
    // "user.name"(a, b) {
    //   // @ts-ignore
    //   this.data["sub-watch-user.name"] = [a, b];
    // },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    num: Number,
    user: Object as DetailedType<User>,
    unionType: {
      type: String,
      optionalTypes: [Number],
    },
  },

  watch: {
    unionType(a, b) {
      // @ts-ignore
      this.data["root-watch-unionType"] = [a, b];
    },
    num(a, b) {
      // @ts-ignore
      this.data["root-watch-num"] = [a, b];
    },
    user(a, b) {
      // @ts-ignore
      this.data["root-watch-user"] = [a, b];
    },
    "user.age"(a, b) {
      // @ts-ignore
      this.data["root-watch-user.age"] = [a, b];
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

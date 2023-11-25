import { DefineComponent, RootComponent, type SpecificType, SubComponent } from "../../src";

type User = { name: string; age: number };

const sub = SubComponent<Root, { properties: { aaa_num: number; aaa_user: User | null } }>()({
  computed: {
    aaa_num(): number {
      return this.data.num;
    },
    aaa_user(): User | null {
      return this.data.user;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    user: {
      type: Object as SpecificType<User>,
      value: { name: "zhao", age: 20 },
    },
  },
  data: {
    // user: { name: "zhao", age: 20 },
    num: 1,
  },
  computed: {
    age() {
      // 情况2
      return (this.data.copyUser1?.age || 20) + this.data.num;
    },
    copyUser1() {
      // 情况1
      return this.data.copyUser;
    },
    copyUser() {
      return this.data.user;
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});

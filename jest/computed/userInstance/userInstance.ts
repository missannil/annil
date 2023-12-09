import { DefineComponent, type DetailedType, RootComponent } from "../../../src";

type User = { name: string; age: number; gender: "female" | "male" };

const externalNum = 1;
const storeUser = {
  name: "xxx",
  gender: "female",
  Average: 25,
};
const rootComponent = RootComponent()({
  properties: {
    user: {
      type: Object as DetailedType<User>,
      value: { name: "zhao", age: 18, gender: "female" },
    },
  },
  data: {
    gapAge: 5,
  },
  store: {
    average: () => storeUser.Average,
  },
  computed: {
    // 可使用this和外部数据,但要特别注意方法的副作用，建议不使用,或使用的方法为纯函数。
    age() {
      return Math.round((this.RealAge(this.data.user!.age) + this.data.average) / 2) + externalNum;
    },
  },
  methods: {
    RealAge(falseAge: number) {
      return falseAge + this.data.gapAge;
    },
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          gapAge: 7,
        });
      }, 0);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
});

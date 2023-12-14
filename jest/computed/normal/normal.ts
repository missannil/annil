import { observable } from "mobx";
import { DefineComponent, type DetailedType, RootComponent, SubComponent } from "../../../src";
import { type CompDoc, type User, user } from "../../common";

const store = observable({
  name: "zhao",
  age: 20,
  addAge(num: number) {
    this.age = this.age + num;
  },
});

const subA = SubComponent<Root, CompDoc>()({
  computed: {
    // 5 可引用根组件properties、data和计算字段
    compA_num(): number {
      return (this.data.optionalUser?.age || 0) + this.data.num + (this.data.CoptionalUser?.age || 0);
    },
    // 6 可引用根组件properties、data和计算字段
    compA_user(): User | null {
      return this.data.copyPropUser;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    requiredUser: Object as DetailedType<User>,
    optionalUser: {
      type: Object as DetailedType<User>,
      value: user,
    },
    forCoverage: {
      type: Object as DetailedType<{ user: { user: User } }>,
      value: { user: { user } },
    },
  },
  data: {
    num: 1,
  },
  store: {
    storeAge: () => store.age,
  },
  computed: {
    CforCoverage() {
      // 为了营造多个依赖字段去触发依赖去重而写。去重时依赖为 ["forCoverage.user.","forCoverage.user.user.age."]  initComputed.ts的79-81行
      this.data.forCoverage?.user;

      this.data.forCoverage?.user.user.age;

      return 123;
    },
    /**
     * 7 可引用store中的数据
     */
    CStoreAge() {
      return this.data.storeAge;
    },
    /**
     * 4 可引用下面(后写)的计算属性的子字段,对应[initComputed.ts](../../../src/behaviors/BComputedAndWatch/initComputed.ts)中的 情形2
     */
    age() {
      return (this.data.copyPropUser?.age || 20) + this.data.num;
    },
    /**
     * 3 可引用下面(后写)的计算属性,对应[initComputed.ts](../../../src/behaviors/BComputedAndWatch/initComputed.ts)中的 情形1
     */
    copyPropUser() {
      return this.data.CrequiredUser;
    },
    // 2 计算属性可引用properties必传字段 对象类型加入null(异步对象数据默认null)。
    CrequiredUser() {
      return this.data.requiredUser;
    },
    // 1 计算属性可引用properties选传字段 对象类型加入null(异步对象数据默认null)。
    CoptionalUser() {
      this.data.optionalUser?.name;

      this.data.optionalUser;

      return this.data.optionalUser;
    },
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          num: 2,
        });
      }, 100);

      setTimeout(() => {
        this.setData({
          requiredUser: { name: "zhao", age: 20 },
        } as any);
      }, 200);

      // 改变对象子字段
      setTimeout(() => {
        this.setData({
          "optionalUser.age": 50,
        } as any);
      }, 300);

      setTimeout(() => {
        store.addAge(10);
      }, 400);

      setTimeout(() => {
        this.setData({
          optionalUser: null,
        } as any);
      }, 1000);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

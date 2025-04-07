import { ChunkComponent, CustomComponent, DefineComponent, type DetailedType, RootComponent } from "../../../src";
import { type CompDoc, type User, user } from "../../common";
import { store } from "./InitializationOnAttach.test";

const customA = CustomComponent<Root, CompDoc>()({
  computed: {
    // 5 可引用根组件properties、data和计算字段
    compA_num(): number {
      return (this.data.optionalUser.age || 0) + this.data.num + (this.data.CoptionalUser.age || 0);
    },
    // 6 可引用根组件properties、data和计算字段
    compA_user(): User {
      return this.data.CoptionalUser;
    },
  },
});
const chunk = ChunkComponent<Root, "chunk">()({
  computed: {
    chunk_num(): number {
      return this.data.num * 2;
    },
    chunk_CStoreAge(): number {
      return this.data.storeAge;
    },
    // 3 可引用其他计算属性的子字段,即使是写在后面的计算属性
    chunk_copyPropName() {
      return this.data.chunk_CrequiredName;
    },
    // 2 计算属性引用properties必传字段的子属性不报错,因为初始化时properties必传字段已经有值了。
    chunk_CrequiredName() {
      return this.data.requiredUser.name;
    },
    // 1 计算属性可引用properties选传字段。
    chunk_CoptionalUser() {
      return this.data.optionalUser;
    },
  },
  // 4 可引用store字段
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  // 为了覆盖率 忽略它
  export() {
    return {};
  },
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
    // 4 可引用store字段
    CStoreAge() {
      return this.data.storeAge;
    },
    // 3 可引用其他计算属性的子字段,即使是写在后面的计算属性
    copyPropName() {
      return this.data.CrequiredName;
    },
    // 2 计算属性引用properties必传字段的子属性不报错,因为初始化时properties必传字段已经有值了。
    CrequiredName() {
      return this.data.requiredUser.name;
    },
    // 1 计算属性可引用properties选传字段。
    CoptionalUser() {
      return this.data.optionalUser;
    },
  },
  // lifetimes: {
  //   attached() {
  //     setTimeout(() => {
  //       this.setData({
  //         num: 2,
  //       });
  //     }, 100);

  //     setTimeout(() => {
  //       this.setData({
  //         requiredUser: { name: "zhao", age: 20 },
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       } as any);
  //     }, 200);

  //     // 改变对象子字段
  //     setTimeout(() => {
  //       this.setData({
  //         "optionalUser.age": 50,
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       } as any);
  //     }, 300);

  //     setTimeout(() => {
  //       store.addAge(10);
  //     }, 400);

  //     setTimeout(() => {
  //       this.setData({
  //         optionalUser: null,
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       } as any);
  //     }, 1000);
  //   },
  // },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [chunk, customA],
});

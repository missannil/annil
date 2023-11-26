import { DefineComponent, RootComponent, type SpecificType, SubComponent } from "../../../src";
import { type CompDoc, type User, user } from "../../common";

const subA = SubComponent<Root, CompDoc>()({
  computed: {
    // 可引用根组件properties、data和计算字段
    compA_num() {
      return this.data.optionalUser!.age! + this.data.num + (this.data.CoptionalUser?.age || 0);
    },
    compA_user() {
      return this.data.copyPropUser;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    requiredUser: Object as SpecificType<User>,
    optionalUser: {
      type: Object as SpecificType<User>,
      value: user,
    },
  },
  data: {
    num: 1,
  },
  computed: {
    /**
     * 可引用下面(后写)的计算属性的子字段,对应[initComputed.ts](../../../src/behaviors/BComputedAndWatch/initComputed.ts)中的 情形2
     */
    age() {
      return (this.data.copyPropUser?.age || 20) + this.data.num;
    },
    /**
     * 可引用下面(后写)的计算属性,对应[initComputed.ts](../../../src/behaviors/BComputedAndWatch/initComputed.ts)中的 情形1
     */
    copyPropUser() {
      return this.data.CrequiredUser;
    },
    // 计算属性可引用properties必传字段 对象类型加入null(异步对象数据默认null)。
    CrequiredUser() {
      return this.data.requiredUser;
    },
    // 计算属性可引用properties选传字段 对象类型加入null(异步对象数据默认null)。
    CoptionalUser() {
      return this.data.optionalUser;
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

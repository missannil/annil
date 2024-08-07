import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

type OnlyCustomCompDoc = ComponentType<{
  customEvents: { aaa_str: string };
}>;

interface User {
  name: string;
  age: number;
}

interface Root {
  properties: {
    num: number;
    user?: User | null;
  };
  data: {
    str: string;
  };
  store: {
    SNum: number;
  };
  computed: {
    bool: boolean;
  };
}

type $aaa = ComponentType<
  { properties: { aaa_str: string; aaa_user: User | null; aaa_num: number; aaa_age: number } }
>;

SubComponent<{}, OnlyCustomCompDoc>()({
  // 1 CompDoc的properties为空时,可以写{}
  computed: {},
});

type OnlyPropsCompDoc = ComponentType<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
    aaa_num123: 123;
    aaa_obj?: Mock_User | null;
  };
}>;

SubComponent<Root, OnlyPropsCompDoc>()({
  inherit: {
    aaa_num: "num",
  },
  data: {
    aaa_str: "a",
  },
  // 2 可写字段为组件去除inherit和data的剩余字段,返回类型应为对应的文档类型
  computed: {
    aaa_obj() {
      return {} as Mock_User | null;
    },
    aaa_num123(): 123 {
      return 123;
    },
  },
});

SubComponent<Root, OnlyPropsCompDoc>()({
  computed: {
    aaa_num() {
      return 123;
    },
    aaa_num123(): 123 {
      return 123;
    },
    aaa_str(): "a" {
      return "a";
    },
    aaa_obj() {
      // 5 this.data
      void Checking<
        typeof this.data,
        ComputeIntersection<
          {
            num: number;
            user: User | null;
            SNum: number;
            str: string;
            bool: boolean;
            aaa_num: number;
            aaa_num123: 123;
            aaa_str: "a" | "b";
            aaa_obj: Mock_User | null;
          } & IInjectAllData
        >,
        Test.Pass
      >;

      return {} as Mock_User;
    },
  },
  lifetimes: {
    attached() {
      // 5 this.data 深度只读
      void Checking<
        typeof this.data,
        ComputeIntersection<
          {
            num: number;
            user: User | null;
            str: string;
            SNum: number;
            bool: boolean;
            aaa_num: number;
            aaa_num123: 123;
            aaa_str: "a" | "b";
            aaa_obj: Mock_User | null;
          } & IInjectAllData
        >,
        Test.Pass
      >;
    },
  },
});

// 计算属性可互相引用,但要加返回类型注释

SubComponent<Root, $aaa>()({
  computed: {
    aaa_num(): number {
      return this.data.SNum;
    },
    aaa_user(): User | null {
      return this.data.user;
    },
    aaa_age(): number {
      return this.data.aaa_num;
    },
    aaa_str(): string {
      return this.data.str;
    },
  },
});

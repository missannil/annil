import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";

import type { IInjectData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

type OnlyCustomCompDoc = ComponentDoc<{
  customEvents: { aaa_str: string };
}>;

type User = { name: string; age: number };

type Root = {
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
};

type $aaa = ComponentDoc<
  { properties: { aaa_str: string; aaa_user: User | null; aaa_num: number; aaa_age: number } }
>;

SubComponent<{}, OnlyCustomCompDoc>()({
  // 1 CompDoc的properties为空时,可以写{}
  computed: {},
});

type OnlyPropsCompDoc = ComponentDoc<{
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
      this.data;

      // 5 this.data
      Checking<
        typeof this.data,
        ReadonlyDeep<
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
          } & IInjectData
        >,
        Test.Pass
      >;

      return {} as Mock_User;
    },
  },
  lifetimes: {
    attached() {
      // 5 this.data 深度只读
      Checking<
        typeof this.data,
        ReadonlyDeep<
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
          } & IInjectData
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

import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { CustomComponent } from "../..";

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

CustomComponent<{}, OnlyCustomCompDoc>()({
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

CustomComponent<Root, OnlyPropsCompDoc>()({
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
// 3 computed字段的返回类型应为对应的文档类型,避免返回字面量类型导致与实际文档类型不符
CustomComponent<Root, OnlyPropsCompDoc>()({
  computed: {
    aaa_num() {
      return 123;
    },
    aaa_num123(): 123 {
      return 123;
    },
    aaa_str() {
      return "a"; // 默认下返回的类型是'a',但文档中是'a' | 'b'.所以要在this.data中处理
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

CustomComponent<Root, $aaa>()({
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
// 计算属性this.data可获取store和data的字段中文档中的字段和内部字段(_开头的字段)
CustomComponent<Root, $aaa>()({
  data: {
    aaa_age: 123,
    _aaa_age1: 123,
  },
  store: {
    aaa_str: () => "a",
    _aaa_age: () => 123,
  },
  computed: {
    aaa_num(): number {
      const { aaa_age, _aaa_age1, _aaa_age, aaa_str } = this.data;
      return aaa_age + _aaa_age1 + _aaa_age + aaa_str.length;
    },
  },
});
// computed中可写 额外字段 isReady
CustomComponent<{ data: { _num: number } }, $aaa>()({
  computed: {
    aaa_isReady() {
      return true;
    },
  },
});

// computed中可写 内部字段
CustomComponent<{ data: { _num: number } }, $aaa>()({
  computed: {
    aaa_isReady() {
      return true;
    },
    _aaa_ccc(): string {
      return "123";
    },
  },
});

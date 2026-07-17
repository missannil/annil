import { Checking, type Test } from "hry-types";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { CustomComponent } from "../..";

type OnlyCustomCompDoc = CreateComponentDoc<"onlyCustom", {
  events: { str: string };
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

type $aaa = CreateComponentDoc<"aaa", {
  properties: { str: string; user: User | null; num: number; age: number };
}>;

CustomComponent<{}, OnlyCustomCompDoc>()({
  // 1 CompDoc的properties为空时,可以写{}
  computed: {},
});

type OnlyPropsCompDoc = CreateComponentDoc<"onlyProps", {
  properties: {
    str: "a" | "b";
    num?: number;
    num123: 123;
    obj?: Mock_User | null;
  };
}>;

CustomComponent<Root, OnlyPropsCompDoc>()({
  inherit: {
    onlyProps_num: "num",
  },
  data: {
    onlyProps_str: "a",
  },
  // 2 可写字段为组件去除inherit和data的剩余字段,返回类型应为对应的文档类型
  computed: {
    onlyProps_obj() {
      return {} as Mock_User | null;
    },
    onlyProps_num123(): 123 {
      return 123;
    },
  },
});
// 3 computed字段的返回类型应为对应的文档类型,避免返回字面量类型导致与实际文档类型不符
CustomComponent<Root, OnlyPropsCompDoc>()({
  computed: {
    onlyProps_num() {
      return 123;
    },
    onlyProps_num123(): 123 {
      return 123;
    },
    onlyProps_str(): "a" | "b" {
      return "a"; // 默认下返回的类型是'a',但文档中是'a' | 'b'.所以要在this.data中处理
    },
    onlyProps_obj(): Mock_User | null {
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
            onlyProps_num: number;
            onlyProps_num123: 123;
            onlyProps_str: "a" | "b";
            onlyProps_obj: Mock_User | null;
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
            onlyProps_num: number;
            onlyProps_num123: 123;
            onlyProps_str: "a" | "b";
            onlyProps_obj: Mock_User | null;
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

// computed中可以使用this实例 之前只能使用this.data字段
type Custom = { type: "custom"; xxx: string };
type Chunk = { type: "chunk"; yyy: number };
type Union = Custom | Chunk;
CustomComponent<{ data: { _num: number }; methods: { IsChunk: (union: Union) => union is Chunk } }, $aaa>()({
  data: {
    _aaa_union: { type: "custom", xxx: "123" } as Union,
  },
  computed: {
    _aaa_count(): string | number {
      const { _aaa_union } = this.data;
      return this.aaa_isCustom(_aaa_union) ? _aaa_union.xxx : _aaa_union.yyy;
    },
    _aaa_isChunk(): boolean {
      const { _aaa_union } = this.data;
      return this.IsChunk(_aaa_union);
    },
  },
  methods: {
    aaa_isCustom(union: Union): union is Custom {
      return union.type === "custom";
    },
  },
});

import { Checking, type Test } from "hry-types";

import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";

import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

interface TestObj {
  subObj: Mock_User;
}

type CompDoc = ComponentType<{
  properties: {
    aaa_str: string;
    aaa_num: number;
  };
}>;

interface RootDoc {
  properties: {
    num: number;
    literal_num: 123 | 456;
    unionStrNum: string | number;
    required_obj: Mock_User | null;
    optional_obj?: TestObj;
  };
  data: {
    str: string;
    literal_str: "a" | "b";
    arr: string[];
  };
  computed: {
    Cuinon: string | boolean;
  };
}

/**
 * watch RootDoc中的数据字段
 */
SubComponent<RootDoc, CompDoc>()({
  data: {
    aaa_str: "str",
  },
  store: {
    aaa_num() {
      return 123;
    },
  },
  watch: {
    // properties 字段

    num(newValue, oldValue) {
      void oldValue;
      void Checking<number, typeof newValue, Test.Pass>;

      void Checking<number, typeof oldValue, Test.Pass>;
    },
    literal_num(newValue, oldValue) {
      void oldValue;
      void Checking<123 | 456, typeof newValue, Test.Pass>;

      void Checking<123 | 456, typeof oldValue, Test.Pass>;
    },
    unionStrNum(newValue, oldValue) {
      void oldValue;
      void Checking<string | number, typeof newValue, Test.Pass>;

      void Checking<string | number, typeof oldValue, Test.Pass>;
    },
    required_obj(newValue, oldValue) {
      void oldValue;
      void Checking<Mock_User, typeof newValue, Test.Pass>;

      void Checking<Mock_User | null, typeof oldValue, Test.Pass>;
    },
    optional_obj(newValue, oldValue) {
      void oldValue;
      void Checking<TestObj, typeof newValue, Test.Pass>;

      void Checking<TestObj, typeof oldValue, Test.Pass>;
    },
    "optional_obj.**"(newValue, oldValue) {
      void oldValue;
      void Checking<TestObj, typeof newValue, Test.Pass>;

      void Checking<TestObj, typeof oldValue, Test.Pass>;
    },
    "optional_obj.subObj"(newValue, oldValue) {
      void oldValue;
      void Checking<Mock_User, typeof newValue, Test.Pass>;

      void Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    "required_obj.age"(newValue, oldValue) {
      void oldValue;
      void Checking<number, typeof newValue, Test.Pass>;

      void Checking<number | undefined, typeof oldValue, Test.Pass>;
    },

    "required_obj.id"(newValue, oldValue) {
      void oldValue;
      void Checking<string, typeof newValue, Test.Pass>;

      void Checking<string, typeof oldValue, Test.Pass>;
    },

    // data 字段
    str(newValue, oldValue) {
      void oldValue;
      void Checking<string, typeof newValue, Test.Pass>;

      void Checking<string, typeof oldValue, Test.Pass>;
    },
    arr(newValue, oldValue) {
      void oldValue;
      void Checking<string[], typeof newValue, Test.Pass>;

      void Checking<string[], typeof oldValue, Test.Pass>;
    },

    literal_str(newValue, oldValue) {
      void oldValue;
      void Checking<"a" | "b", typeof newValue, Test.Pass>;

      void Checking<"a" | "b", typeof oldValue, Test.Pass>;
    },
    // 计算字段
    Cuinon(newValue, oldValue) {
      void oldValue;
      void Checking<string | boolean, typeof newValue, Test.Pass>;
      void Checking<string | boolean, typeof oldValue, Test.Pass>;
    },
  },
});

import { typeEqual } from "../../../../utils/typeEqual";

import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { CustomComponent } from "../..";

interface TestObj {
  subObj: Mock_User;
}

type CompDoc = CreateComponentDoc<"aaa", {
  properties: {
    str: string;
    num: number;
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
CustomComponent<RootDoc, CompDoc>()({
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
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    literal_num(newValue, oldValue) {
      void oldValue;
      void typeEqual<123 | 456, typeof newValue>;

      void typeEqual<123 | 456, typeof oldValue>;
    },
    unionStrNum(newValue, oldValue) {
      void oldValue;
      void typeEqual<string | number, typeof newValue>;

      void typeEqual<string | number, typeof oldValue>;
    },
    required_obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User | null, typeof newValue>;

      void typeEqual<Mock_User | null, typeof oldValue>;
    },
    optional_obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<TestObj, typeof newValue>;

      void typeEqual<TestObj, typeof oldValue>;
    },
    "optional_obj.**"(newValue, oldValue) {
      void oldValue;
      void typeEqual<TestObj, typeof newValue>;

      void typeEqual<TestObj, typeof oldValue>;
    },
    "optional_obj.subObj"(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User, typeof newValue>;

      void typeEqual<Mock_User, typeof oldValue>;
    },

    // data 字段
    str(newValue, oldValue) {
      void oldValue;
      void typeEqual<string, typeof newValue>;

      void typeEqual<string, typeof oldValue>;
    },
    arr(newValue, oldValue) {
      void oldValue;
      void typeEqual<string[], typeof newValue>;

      void typeEqual<string[], typeof oldValue>;
    },

    literal_str(newValue, oldValue) {
      void oldValue;
      void typeEqual<"a" | "b", typeof newValue>;

      void typeEqual<"a" | "b", typeof oldValue>;
    },
    // 计算字段
    Cuinon(newValue, oldValue) {
      void oldValue;
      void typeEqual<string | boolean, typeof newValue>;
      void typeEqual<string | boolean, typeof oldValue>;
    },
  },
});

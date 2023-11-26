import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";

import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type RootDoc = RootComponentDoc<{
  properties: {
    Pstr: string;
    Pobj: Mock_User | null;
    PoptionalObj?: Mock_User;
  };
  data: {
    Dnum: number;
  };
  computed: {
    Cnum: number;
  };
  methods: {
    RootM: () => number;
  };
  customEvents: {
    RootCus: string;
  };
  events: {
    RootE1: () => string;
  };
}>;

type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: string;
  };
  customEvents: {
    aaa_num: number;
  };
}>;

SubComponent<RootDoc, CompDoc>()({
  data: {
    aaa_str: "str",
  },
  store: {
    _aaa_SubReactive: () => 123,
  },
  computed: {},
  methods: {
    aaa_SubM() {},
  },
  events: {
    aaa_num() {},
  },
  lifetimes: {
    created() {
      // this.data
      Checking<
        typeof this.data,
        ReadonlyDeep<{
          // RootData
          Pstr: string;
          Pobj: Mock_User | null;
          PoptionalObj: Mock_User;
          Dnum: number;
          Cnum: number;
          // 自身Data
          aaa_str: "str";
          _aaa_SubReactive: 123;
        }>,
        Test.Pass
      >;

      // this.Methods 可调用自身和RootDoc中的methods方法,其他不可以
      Checking<typeof this.RootM, () => number, Test.Pass>;

      Checking<typeof this.RootCus, (detail: string) => void, Test.Pass>;

      Checking<typeof this.aaa_SubM, () => void, Test.Pass>;

      // 其他官方字段 ...
    },
  },
});

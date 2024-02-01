import { Checking, type Test } from "hry-types";
import type { ComponentDoc } from "../../../../DefineComponent/ReturnType/ComponentDoc";
import type { Mock_User } from "../../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentDoc } from "../../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../../..";

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
    _aaa_num: 123,
  },
  computed: {
    _aaa_isReady() {
      return false;
    },
  },

  lifetimes: {
    created() {
      Checking<
        typeof this.cloneData,
        {
          // inheritData
          injectTheme: "dark" | "light" | undefined;
          injectStr: string;
          // RootData
          Pstr: string;
          Pobj: Mock_User | null;
          PoptionalObj: Mock_User;
          Dnum: number;
          Cnum: number;
          // 自身Data类型与CompDoc类型相同
          aaa_str: string;
          _aaa_isReady: boolean;
          _aaa_num: number;
        },
        Test.Pass
      >;
    },
  },
});

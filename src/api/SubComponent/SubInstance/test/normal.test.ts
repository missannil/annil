import { Checking, type Test } from "hry-types";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
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
        ComputeIntersection<
          {
            // RootData
            Pstr: string;
            Pobj: Mock_User | null;
            PoptionalObj: Mock_User;
            Dnum: number;
            Cnum: number;
            // 自身Data类型与CompDoc类型相同
            aaa_str: string;
          } & IInjectAllData
        >,
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

import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentType } from "../../../RootComponent/RootComponentType";
import { CustomComponent } from "../..";

type RootDoc = RootComponentType<{
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

type CompDoc = ComponentType<{
  properties: {
    aaa_str: string;
  };
  customEvents: {
    aaa_num: number;
  };
}>;

CustomComponent<RootDoc, CompDoc>()({
  data: {
    aaa_str: "str",
  },
  computed: {},
  methods: {
    aaa_SubM() {
      void 0;
    },
  },
  events: {
    aaa_num() {
      void 0;
    },
  },
  lifetimes: {
    created() {
      // this.data
      void Checking<
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
      void Checking<typeof this.RootM, () => number, Test.Pass>;

      void Checking<typeof this.RootCus, (detail: string) => void, Test.Pass>;

      void Checking<typeof this.aaa_SubM, () => void, Test.Pass>;

      // 其他官方字段 ...
    },
  },
});

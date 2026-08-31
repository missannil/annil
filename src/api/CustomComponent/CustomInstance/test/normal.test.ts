import { typeEqual } from "../../../../utils/typeEqual";

import type { _SimplifyIntersection } from "hry-types";
import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentDefinition } from "../../../RootComponent/returnType";
import { CustomComponent } from "../..";

type RootDoc = RootComponentDefinition<{
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

type CompDoc = CreateComponentDoc<"aaa", {
  properties: {
    str: string;
  };
  events: {
    num: number;
  };
}>;

CustomComponent<RootDoc, CompDoc>()({
  data: {
    aaa_str: "str" as string,
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
      void typeEqual<
        typeof this.data,
        _SimplifyIntersection<
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
        >
      >;

      // this.Methods 可调用自身和RootDoc中的methods方法,其他不可以
      void typeEqual<typeof this.RootM, () => number>;

      void typeEqual<typeof this.RootCus, (detail: string) => void>;

      void typeEqual<typeof this.aaa_SubM, () => void>;

      // 其他官方字段 ...
    },
  },
});

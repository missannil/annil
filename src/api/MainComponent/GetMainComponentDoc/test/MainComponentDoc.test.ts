import { ValueChecking } from "hry-types";

import type { AnyObject } from "hry-types";
import type { WMBaseEvent } from "../../../../common_types/officialAlias";
import type { SpecificType } from "../../../../common_types/SpecificType";
import { MainComponent } from "../..";
import type { Mock_Cart, Mock_User } from "../../Properties/test/PropertiesConstraint.test";

const allFileds = MainComponent({
  properties: {
    str: String,
    obj: Object,
    num: Number as SpecificType<0 | 1 | 2>,
    bool: Boolean,
    arr: Array as SpecificType<number[] | string[]>,
    optional: {
      type: Object as SpecificType<Mock_User | Mock_Cart>,
      value: { id: "001", name: "zhao" },
    },
    unionRequired: {
      type: String,
      optionalTypes: [Number],
    },
  },
  data: {
    reactive: () => 123,
    aaa: "str",
  },
  computed: {
    CData() {
      return this.data.reactive + this.data.num;
    },
  },
  // customEvents: {
  // customA: String,
  // customB: null,
  // Bubbles: {
  //   detailType: Number,
  //   options: {
  //     bubbles: true,
  //   },
  // },
  // BubblesComposed: {
  //   detailType: String,
  //   options: {
  //     composed: true,
  //     bubbles: true,
  //   },
  // },
  // capturePhase: {
  //   detailType: String,
  //   options: {
  //     capturePhase: true,
  //   },
  // },
  // capturePhaseComposed: {
  //   detailType: String,
  //   options: {
  //     capturePhase: true,
  //     composed: true,
  //   },
  // },
  // BubblesCapturePhaseComposed: {
  //   detailType: String,
  //   options: {
  //     capturePhase: true,
  //     composed: true,
  //     bubbles: true,
  //   },
  // },
  // },
  events: {
    onTap(e) {
      ValueChecking<WMBaseEvent>()(e);
    },
  },
  methods: {
    M1(num: number) {
      ValueChecking<number>()(num);

      return num + 10;
    },
  },
});

type Expect = {
  properties: {
    str: string;
    obj: AnyObject | null;
    num: 0 | 1 | 2;
    bool: boolean;
    arr: number[] | string[];
    optional?: Mock_Cart | Mock_User;
    unionRequired: string | number;
  };
  allData: {
    str: string;
    obj: AnyObject | null;
    num: 0 | 1 | 2;
    bool: boolean;
    arr: number[] | string[];
    optional: Mock_Cart | Mock_User;
    unionRequired: string | number;
    // data
    reactive: 123;
    aaa: string;
    // computed
    CData: number;
  };
  // customEvents: {
  // customA: string;
  // customB: null;
  // Bubbles: number | BubblesSign;
  // BubblesComposed: string | BubblesComposedSign;
  // capturePhase: string | CapturePhaseSign;
  // capturePhaseComposed: string | CapturePhaseComposedSign;
  // BubblesCapturePhaseComposed: string | BubblesCapturePhaseComposedSign;
  // };
  events: {
    onTap: (e: WMBaseEvent) => void;
  };
  methods: {
    M1: (num: number) => number;
  };
};

ValueChecking<Expect>()(allFileds);

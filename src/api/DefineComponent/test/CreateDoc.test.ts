import { type O, type Test, TypeChecking } from "hry-types";
import { MainComponent } from "../../MainComponent";

import type { SpecificType } from "../../..";
import type {
  BubblesCapturePhaseComposedExpected,
  BubblesCapturePhaseExpected,
  BubblesComposedExpected,
  bubblesExpected,
  CapturePhaseComposedExpected,
  CapturePhaseExpected,
} from "../../MainComponent/CustomEvents/test/GetFullEventDoc.test";
import type {
  ListExpected,
  NullExpected,
  StrExpected,
  UnionStrExpected,
} from "../../MainComponent/CustomEvents/test/GetShortEventDoc.test";
import { DefineComponent } from "..";

// 测试组件时,即MainComponent无isPage字段或isPage字段为false

// MainComponent只有properties字段
const componentProperties = MainComponent({
  properties: {
    str: String,
  },
});
// DefineComponent无subComponents字段
const Test1 = DefineComponent({
  name: "test",
  mainComponent: componentProperties,
});

type Test1Expected = {
  properties: {
    test_str: string;
  };
};

TypeChecking<Test1Expected, typeof Test1, Test.Pass>;

// DefineComponent的subComponents字段为[]
const Test2 = DefineComponent({
  name: "test",
  mainComponent: componentProperties,
  subComponents: [],
});

type Test2Expected = {
  properties: {
    test_str: string;
  };
};

TypeChecking<Test2Expected, typeof Test2, Test.Pass>;

// DefineComponent的subComponents字段包含properties字段
const test3 = DefineComponent({
  name: "test",
  mainComponent: componentProperties,
  subComponents: [{ properties: { num: 123 } }],
});

type Test3Expected = {
  properties: {
    test_str: string;
    test_num: number;
  };
};

TypeChecking<Test3Expected, typeof test3, Test.Pass>;

// 测试页面时,即MainComponent的isPage字段为true

// MainComponent只有properties字段
const componentProperties2 = MainComponent({
  isPage: true,
  properties: {
    str: String,
  },
});
// DefineComponent无subComponents字段
const Test4 = DefineComponent({
  path: "/xxx/xxx/xxx",
  mainComponent: componentProperties2,
});

type Test4Expected = {
  path: "/xxx/xxx/xxx";
  properties: {
    str: string;
  };
};

TypeChecking<Test4Expected, typeof Test4, Test.Pass>;

// DefineComponent的subComponents字段为[]
const Test5 = DefineComponent({
  path: "/xxx/xxx/xxx",
  mainComponent: componentProperties2,
  subComponents: [],
});

type Test5Expected = {
  path: "/xxx/xxx/xxx";
  properties: {
    str: string;
  };
};

TypeChecking<Test5Expected, typeof Test5, Test.Pass>;

// DefineComponent的subComponents字段包含properties字段
const Test6 = DefineComponent({
  path: "/xxx/xxx/xxx",
  mainComponent: componentProperties2,
  subComponents: [{ properties: { num: 123 } }],
});

type Test6Expected = {
  path: "/xxx/xxx/xxx";
  properties: {
    str: string;
    num: number;
  };
};

TypeChecking<Test6Expected, typeof Test6, Test.Pass>;

// 测试组件时,即MainComponent无isPage字段或isPage字段为false

// MainComponent只有customEvents字段
const componentCustomEvents = MainComponent({
  customEvents: {
    str: String,
    null: null,
    unionStr: String as SpecificType<"male" | "female">,
    list: [String, Number as SpecificType<0 | 1 | 2>, null],
    bubbles: {
      detailType: String,
      options: { bubbles: true },
    },
    capturePhase: {
      detailType: null,
      options: { capturePhase: true },
    },
    bubbles_capturePhase: {
      detailType: [String, Number],
      options: { bubbles: true, capturePhase: true },
    },
    bubbles_composed: {
      detailType: String as SpecificType<"male" | "female">,
      options: { bubbles: true, composed: true },
    },
    capturePhase_composed: {
      detailType: [String, Number as SpecificType<0 | 1 | 2>, null],
      options: { capturePhase: true, composed: true },
    },
    bubbles_capturePhase_composed: {
      detailType: Boolean,
      options: { bubbles: true, capturePhase: true, composed: true },
    },
  },
});
// DefineComponent无subComponents字段
const Test7 = DefineComponent({
  name: "test",
  mainComponent: componentCustomEvents,
});

type Test7Expected = {
  customEvents: {
    str: StrExpected;
    null: NullExpected;
    unionStr: UnionStrExpected;
    list: ListExpected;
    bubbles: bubblesExpected;
    capturePhase: CapturePhaseExpected;
    bubbles_capturePhase: BubblesCapturePhaseExpected;
    bubbles_composed: BubblesComposedExpected;
    capturePhase_composed: CapturePhaseComposedExpected;
    bubbles_capturePhase_composed: BubblesCapturePhaseComposedExpected;
  };
};

TypeChecking<Test7Expected, typeof Test7, Test.Pass>;

// DefineComponent的subComponents字段为[]
const Test8 = DefineComponent({
  name: "test",
  mainComponent: { isPage: false },
  subComponents: [],
});

type Test8Expected = {};

TypeChecking<Test8Expected, typeof Test8, Test.Pass>;

// DefineComponent的subComponents字段包含customEvents字段
const Test9 = DefineComponent({
  name: "test",
  mainComponent: { isPage: false },
  subComponents: [
    { customEvents: { str: "str" } },
    { customEvents: { null: null } },
  ],
});

type Test9Expected = {
  customEvents:
    & { str: string }
    & { null: null };
};

TypeChecking<Test9Expected, typeof Test9, Test.Pass>;

// 测试subComponents重复字段

const Test10 = DefineComponent({
  name: "test",
  mainComponent: { isPage: false },
  subComponents: [
    { customEvents: { str: "str" } },
    { customEvents: { str: 123 } },
  ],
});

type Test10Expected = {
  customEvents:
    & { str: string }
    & { str: number };
};

TypeChecking<Test10Expected, typeof Test10, Test.Pass>;

// 测试 类型实例化过深，且可能无限
const A = { customEvents: { str: "str", a: 123 } };

const B = { customEvents: { num: 123, a: 123 } };

const C = { customEvents: { num: "123", a: 123 } };

const Test11 = DefineComponent({
  name: "test",
  mainComponent: {},
  // dprint-ignore
  subComponents: [
// 30一行 
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C, A, B, C,
//990
A, B, C, A, B, C, A, B, C,//999
  ],
});

type Test11Expected = {
  customEvents: {
    str: string;
    a: number;
    num: never;
  };
};

TypeChecking<Test11Expected, O.ComputeIntersectionDeep<typeof Test11>, Test.Pass>;

// 测试12 空页面 mainComponent 和 subComponents 都是空的时

const Test12 = DefineComponent({
  path: "/xxx/xxx/xxx",
  mainComponent: { isPage: true },
  subComponents: [],
});

type Test12Expected = { path: "/xxx/xxx/xxx" };

TypeChecking<Test12Expected, typeof Test12, Test.Pass>;

// 测试13 组件时 mainComponent 和 subComponents 都是空的时
const Test13 = DefineComponent({
  name: "test12",
  mainComponent: {},
});

type Test13Expected = {};

TypeChecking<Test13Expected, typeof Test13, Test.Pass>;

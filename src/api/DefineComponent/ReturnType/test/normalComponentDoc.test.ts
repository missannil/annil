import { Checking, type Test } from "hry-types";
import { type ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import { RootComponent, type SpecificType } from "../../../..";
import type { CustomEventConstraint } from "../../../RootComponent/CustomEvents/CustomEventConstraint";
import type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
  Composed,
} from "../../../RootComponent/CustomEvents/CustomEventsTag";

import type { PropertiesConstraint } from "../../../RootComponent/Properties/PropertiesConstraint";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import type { SubComponentDoc } from "../../../SubComponent/SubComponentDoc";
import { DefineComponent } from "../..";

const properties = {
  str: String,
  obj: Object as SpecificType<Mock_User>,
  optionalObj: {
    type: Object as SpecificType<Mock_User>,
    value: {} as Mock_User,
  },
  optionalObjOrNull: {
    type: Object as SpecificType<Mock_User | null>,
    value: null,
  },
} satisfies PropertiesConstraint;
const customEvents = {
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
} satisfies CustomEventConstraint;
// 只有Properties字段
const OnlyPropsRootDoc = RootComponent()({
  properties,
});

const onlyProperties = DefineComponent({
  name: "test",
  rootComponent: OnlyPropsRootDoc,
});

// 可传对象字段加入null,(rootDoc中必传对象加入null了)
type OnlyPropertiesExpected = {
  properties: {
    test_optionalObj?: Mock_User | null; // 多了null
    test_optionalObjOrNull?: Mock_User | null;
    test_str: string;
    test_obj: Mock_User | null;
  };
};

Checking<typeof onlyProperties, OnlyPropertiesExpected, Test.Pass>;

// 只有customEvents字段
const OnlyCustomEventsRootDoc = RootComponent()({
  customEvents,
});

const compOnlyCustomEvents = DefineComponent({
  name: "test",
  rootComponent: OnlyCustomEventsRootDoc,
});

type CompOnlyCustomEventsExpected = {
  customEvents: {
    test_str: string;
    test_null: null;
    test_unionStr: "male" | "female";
    test_list: string | 0 | 1 | 2 | null;
    test_bubbles: string | Bubbles;
    test_capturePhase: Capture | null;
    test_bubbles_capturePhase: string | number | BubblesCapture;
    test_bubbles_composed: "male" | "female" | BubblesComposed;
    test_capturePhase_composed: string | 0 | 1 | 2 | CaptureComposed | null;
    test_bubbles_capturePhase_composed: boolean | BubblesCaptureComposed;
  };
};

Checking<typeof compOnlyCustomEvents, CompOnlyCustomEventsExpected, Test.Pass>;

// 都有
const rootComponent = RootComponent()({
  properties,
  customEvents,
});

const compDoc = DefineComponent({
  name: "test",
  rootComponent,
});

Checking<typeof compDoc, ComputeIntersectionDeep<CompOnlyCustomEventsExpected & OnlyPropertiesExpected>, Test.Pass>;

// rootComponent字段和SubComponents字段同时具有properties字段时
// const A = {} as { properties: { str: string; obj: { age: number } } };

// const B = {} as { properties: { num: number } };

// const C = {} as { properties: { bool: boolean } };

// const CompDoc = DefineComponent({
//   name: "test",
//   subComponents: [A, B, C],
// });

// // 因为子组件中properties不存在相同key,所以返回类型是交叉的。
// type CompDocExpect = ComputeIntersectionDeep<
//   {
//     properties: {
//       test_str: string;
//       test_obj: {
//         age: number;
//       } | null;
//       test_num: number;
//       test_bool: boolean;
//     };
//   }
// >;

// Checking<typeof CompDoc, CompDocExpect, Test.Pass>;

type D = SubComponentDoc<{
  str: string | Bubbles | Composed;
  num: number | Capture | Composed;
  null: null | Bubbles | Capture | Composed;
}>;

const customEventsRootDoc = DefineComponent({
  name: "test",
  subComponents: [{} as D],
});

// 预期添加组件名做为前缀
type customEventsRootDocExpect = {
  customEvents: {
    test_str: string | Bubbles | Composed;
    test_num: number | Capture | Composed;
    test_null: null | Bubbles | Capture | Composed;
  };
};

Checking<typeof customEventsRootDoc, customEventsRootDocExpect, Test.Pass>;

type E = SubComponentDoc<{
  str: number | Bubbles | Composed;
  num: string | Capture | Composed;
  null: boolean | Bubbles | Capture | Composed;
}>;

// 子组件有相同自定义字段时
const WhenSameKeyOfCustomEventsRootDoc = DefineComponent({
  name: "test",
  subComponents: [{} as D, {} as E],
});

// customEvents相同key类型联合
type WhenSameKeyOfCustomEventsRootDocExpect = {
  customEvents: {
    test_str: string | number | Bubbles | Composed;
    test_num: string | number | Capture | Composed;
    test_null: boolean | Bubbles | Capture | Composed | null;
  };
};

Checking<typeof WhenSameKeyOfCustomEventsRootDoc, WhenSameKeyOfCustomEventsRootDocExpect, Test.Pass>;

type RootDocCatch = RootComponentDoc<{
  events: {
    aaa_str_bubbles_catch: () => void;
  };
}>;

// 根组件有阻止(catch)子组件事件时
const whenRootDocCatch = DefineComponent({
  name: "test",
  rootComponent: {} as RootDocCatch,
  subComponents: [{} as D],
});

type whenRootDocCatchExpect = {
  customEvents: {
    test_num: number | Composed | Capture;
    test_null: Bubbles | Composed | Capture | null;
  };
};

Checking<typeof whenRootDocCatch, whenRootDocCatchExpect, Test.Pass>;

// ComponetDoc可能返回类型为{}
const ComponetDoc = DefineComponent({
  name: "test",
  rootComponent: {},
  subComponents: [],
});

Checking<typeof ComponetDoc, {}, Test.Pass>;

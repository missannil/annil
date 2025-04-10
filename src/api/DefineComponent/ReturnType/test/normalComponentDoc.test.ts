/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checking, type Test } from "hry-types";
import { CustomComponent, type DetailedType, RootComponent } from "../../../..";
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

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { CustomComponentType } from "../../../CustomComponent/CustomComponentType";
import type { PropertiesConstraint } from "../../../RootComponent/Properties/PropertiesConstraint";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentType } from "../../../RootComponent/RootComponentType";
import { DefineComponent } from "../..";

const properties = {
  str: String,
  obj: Object as DetailedType<Mock_User>,
  optionalObj: {
    type: Object as DetailedType<Mock_User>,
    value: {} as Mock_User,
  },
  optionalObjOrNull: {
    type: Object as DetailedType<Mock_User | null>,
    value: null,
  },
} satisfies PropertiesConstraint;
const customEvents = {
  str: String,
  null: null,
  unionStr: String as DetailedType<"male" | "female">,
  list: [String, Number as DetailedType<0 | 1 | 2>, null],
  bubbles: {
    detail: String,
    options: { bubbles: true },
  },
  capturePhase: {
    detail: null,
    options: { capturePhase: true },
  },
  bubbles_capturePhase: {
    detail: [String, Number],
    options: { bubbles: true, capturePhase: true },
  },
  bubbles_composed: {
    detail: String as DetailedType<"male" | "female">,
    options: { bubbles: true, composed: true },
  },
  capturePhase_composed: {
    detail: [String, Number as DetailedType<0 | 1 | 2>, null],
    options: { capturePhase: true, composed: true },
  },
  bubbles_capturePhase_composed: {
    detail: Boolean,
    options: { bubbles: true, capturePhase: true, composed: true },
  },
} satisfies CustomEventConstraint;

const OnlyPropsRootDoc = RootComponent()({
  properties,
});

const onlyProperties = DefineComponent({
  name: "test",
  rootComponent: OnlyPropsRootDoc,
});

// 1. 类型为typeof OnlyPropsRootDoc加前缀(组件名)
type OnlyPropertiesExpected = {
  properties: {
    test_optionalObj?: Mock_User;
    test_optionalObjOrNull?: Mock_User | null;
    test_str: string;
    test_obj: Mock_User;
  };
};

Checking<typeof onlyProperties, OnlyPropertiesExpected, Test.Pass>;

const OnlyCustomEventsRootDoc = RootComponent()({
  customEvents,
});

const compOnlyCustomEvents = DefineComponent({
  name: "test",
  rootComponent: OnlyCustomEventsRootDoc,
});

// 2 rootComponent中只有customEvents字段时 加前缀(组件名) 无properties字段
type CompOnlyCustomEventsExpected = {
  customEvents: {
    test_str: string;
    test_null: null;
    test_unionStr: "male" | "female";
    test_list: string | 0 | 1 | 2 | null;
    test_bubbles: string | Bubbles;
    test_capturePhase: null | Capture;
    test_bubbles_capturePhase: string | number | BubblesCapture;
    test_bubbles_composed: "male" | "female" | BubblesComposed;
    test_capturePhase_composed: string | 0 | 1 | 2 | CaptureComposed | null;
    test_bubbles_capturePhase_composed: boolean | BubblesCaptureComposed;
  };
};

Checking<typeof compOnlyCustomEvents, CompOnlyCustomEventsExpected, Test.Pass>;

const rootComponent = RootComponent()({
  properties,
  customEvents,
});
// 3. properties和customEvents字段都有时
const compDoc = DefineComponent({
  name: "test",
  rootComponent,
});

Checking<typeof compDoc, ComputeIntersection<CompOnlyCustomEventsExpected & OnlyPropertiesExpected>, Test.Pass>;

type SubA = CustomComponentType<{
  composedEvents: {
    str: string | Bubbles | Composed;
    num: number | Capture | Composed;
    null: null | Bubbles | Capture | Composed;
  };
}>;

const customEventsRootDoc = DefineComponent({
  name: "test",
  subComponents: [{} as SubA],
});

// 4 子组件返回的事件类型是必带Composed的
type customEventsRootDocExpect = {
  customEvents: {
    test_str: string | Bubbles | Composed;
    test_num: number | Capture | Composed;
    test_null: null | Bubbles | Capture | Composed;
  };
};

Checking<typeof customEventsRootDoc, customEventsRootDocExpect, Test.Pass>;

type SubB = CustomComponentType<{
  composedEvents: {
    str: number | Bubbles | Composed;
    num: string | Capture | Composed;
    null: boolean | Bubbles | Capture | Composed;
  };
}>;

//
const WhenSameKeyOfCustomEventsRootDoc = DefineComponent({
  name: "test",
  subComponents: [{} as SubA, {} as SubB],
});

// 5 子组件中存在相同自定义事件字段时,类型联合
type WhenSameKeyOfCustomEventsRootDocExpect = {
  customEvents: {
    test_str: string | number | Bubbles | Composed;
    test_num: string | number | Capture | Composed;
    test_null: boolean | Bubbles | Capture | Composed | null;
  };
};

Checking<typeof WhenSameKeyOfCustomEventsRootDoc, WhenSameKeyOfCustomEventsRootDocExpect, Test.Pass>;

type RootDocCatch = RootComponentType<{
  events: {
    aaa_str_bubbles_catch: () => void;
  };
}>;

const whenRootDocCatch = DefineComponent({
  name: "test",
  rootComponent: {} as RootDocCatch,
  subComponents: [{} as SubA],
});

// 6 根组件有阻止(catch)子组件事件时(子组件aaa的str事件是阻止事件,不会被继续传递),去除对应的事件
type whenRootDocCatchExpect = {
  customEvents: {
    // 少了str事件
    test_num: number | Composed | Capture;
    test_null: Bubbles | Composed | Capture | null;
  };
};

Checking<typeof whenRootDocCatch, whenRootDocCatchExpect, Test.Pass>;

// 7 根组件和子组件都没有事件和properties时 返回组件类型为 {}
const ComponetDoc = DefineComponent({
  name: "test",
  rootComponent: {},
  subComponents: [],
});

Checking<typeof ComponetDoc, {}, Test.Pass>;

// 8 自定义事件文档类型与定义的类型相同
const rootComponent8 = RootComponent()({
  customEvents: {
    // 减少商品
    decrease: Object as DetailedType<Mock_User>,
  },
});

Checking<(typeof rootComponent8)["customEvents"]["decrease"], Mock_User, Test.Pass>;

const subA = CustomComponent<RootComponentType, { properties: { subA_num: number } }>()({});
// SubComponent中计算属性字段函数若不写返回值,会造成结果中没有计算属性字段类型,若没有其他字段,结果就为'{}'
const subB = CustomComponent<RootComponentType, { properties: { subB_str: string } }>()({
  computed: {
    subB_str() {
      return this.data.injectStr;
    },
  },
});
const c = {};
DefineComponent({
  name: "test",
  //  subA 应该报错 但当前不会报错,因为c的类型是{},引起subA不报错
  subComponents: [subA, c],
});

DefineComponent({
  name: "test",
  // @ts-expect-error 缺少必传的字段subB_str 正常报错
  subComponents: [subA, subB],
});

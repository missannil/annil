/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Checking, type Test } from "hry-types";
import type { Wm } from "../../../../thirdLib";

import type { Detail, Mark, WMBaseEvent } from "../../../..";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
} from "../../../RootComponent/CustomEvents/CustomEventsTag";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

type CompDoc = ComponentType<{
  customEvents: {
    aaa_str: string;
    aaa_bubbles: string | Bubbles;
    aaa_CapturePhase: string | Capture;
    aaa_BubblesCapturePhase: null | BubblesCapture;
    aaa_BubblesComposed: string | BubblesComposed;
    aaa_CapturePhaseComposed: string | CaptureComposed;
    aaa_BubblesCapturePhaseComposed: string | BubblesCaptureComposed;
  };
}>;

// 1.1 events字段提示 key为 CompDoc下customEvents的字段,类型为函数(e)=>void,e为对应keys类型去除事件标记(冒泡 捕获 穿透)
const sub1 = SubComponent<{}, CompDoc>()({
  events: {
    aaa_str(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_bubbles(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_CapturePhase(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_BubblesCapturePhase(e) {
      Checking<typeof e.detail, null, Test.Pass>;
    },
    aaa_BubblesComposed(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_CapturePhaseComposed(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_BubblesCapturePhaseComposed(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
  },
});

type Sub1Expected = {
  composedEvents: {
    BubblesComposed: string | BubblesComposed;
    CapturePhaseComposed: string | CaptureComposed;
    BubblesCapturePhaseComposed: string | BubblesCaptureComposed;
  };
  events: {
    aaa_str(e: Detail<string>): void;
    aaa_bubbles(e: Detail<string>): void;
    aaa_CapturePhase(e: Detail<string>): void;
    aaa_BubblesCapturePhase(e: Detail<null>): void;
    aaa_BubblesComposed(e: Detail<string>): void;
    aaa_CapturePhaseComposed(e: Detail<string>): void;
    aaa_BubblesCapturePhaseComposed(e: Detail<string>): void;
  };
};

// 1.2 Composed事件会被返回
Checking<typeof sub1, Sub1Expected, Test.Pass>;

// 2.1 key可写入后缀字段(_catch,表示阻止冒泡和捕获事件)。
const sub2 = SubComponent<{}, CompDoc>()({
  events: {
    aaa_BubblesComposed_catch(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_CapturePhaseComposed_catch(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
  },
});

// 2.2 返回没有被加后最(_catch)的Composed事件
Checking<typeof sub2, {
  composedEvents: {
    BubblesCapturePhaseComposed: string | BubblesCaptureComposed;
  };
  events: {
    aaa_BubblesComposed_catch(e: Detail<string>): void;
    aaa_CapturePhaseComposed_catch(e: Detail<string>): void;
  };
}, Test.Pass>;

const sub3 = SubComponent<{}, CompDoc>()({
  events: {
    aaa_BubblesComposed_catch(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_CapturePhaseComposed_catch(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
    aaa_BubblesCapturePhaseComposed_catch(e) {
      Checking<typeof e.detail, string, Test.Pass>;
    },
  },
});

// 2.4 若Composed事件都被阻止则返回never
Checking<typeof sub3, {
  events: {
    aaa_BubblesComposed_catch(e: Detail<string>): void;
    aaa_CapturePhaseComposed_catch(e: Detail<string>): void;
    aaa_BubblesCapturePhaseComposed_catch(e: Detail<string>): void;
  };
}, Test.Pass>;

// 3.1 基础组件基本事件参数为WMBaseEvent
SubComponent<{}, Wm.View>()({
  events: {
    view_tap(e) {
      Checking<typeof e, WMBaseEvent, Test.Pass>;
    },
    view_longtap(e) {
      Checking<typeof e, WMBaseEvent, Test.Pass>;
    },
    // ...
  },
});

// 3.1 基础组件自定义事件参数为Detail<object>
SubComponent<{}, Wm.ScrollView>()({
  events: {
    scrollView_bindscroll(e) {
      Checking<
        typeof e,
        Detail<{
          scrollLeft: number;
          scrollTop: number;
          scrollHeight: number;
          scrollWidth: number;
          deltaX: number;
          deltaY: number;
        }>,
        Test.Pass
      >;
    },
    // ...
  },
});

// 4 可为事件自定义类型
SubComponent<{}, Wm.View>()({
  events: {
    view_tap(e: Detail<number>) {
      Checking<typeof e.detail, number, Test.Pass>;
    },
    view_longtap(e: Mark<Mock_User>) {
      Checking<typeof e.mark, Mock_User, Test.Pass>;
    },
    // ...
  },
});

// 4 可为事件自定义类型
SubComponent<{}, Wm.View>()({
  events: {
    view_tap(e: Detail<number>) {
      Checking<typeof e.detail, number, Test.Pass>;
    },
    view_longtap(e: Mark<Mock_User>) {
      Checking<typeof e.mark, Mock_User, Test.Pass>;
    },
    // ...
  },
});

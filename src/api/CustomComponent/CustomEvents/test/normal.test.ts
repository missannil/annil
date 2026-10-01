/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { Wm } from "../../../../thirdLib";
import { typeEqual } from "../../../../utils/typeEqual";

import { type CreateComponentDoc, type Detail, type Mark, RootComponent, type WMBaseEvent } from "../../../..";
import type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
} from "../../../RootComponent/CustomEvents/CustomEventsTag";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { CustomComponent } from "../..";

type CompDoc = CreateComponentDoc<"aaa", {
  events: {
    str: string;
    bubbles: string | Bubbles;
    CapturePhase: string | Capture;
    BubblesCapturePhase: null | BubblesCapture;
    BubblesComposed: string | BubblesComposed;
    CapturePhaseComposed: string | CaptureComposed;
    BubblesCapturePhaseComposed: string | BubblesCaptureComposed;
  };
}>;

// 1.1 events字段提示 key为 CompDoc下customEvents的字段,类型为函数(e)=>void,e为对应keys类型去除事件标记(冒泡 捕获 穿透)
const custom1 = CustomComponent<{}, CompDoc>()({
  events: {
    aaa_str(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_bubbles(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_CapturePhase(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_BubblesCapturePhase(e) {
      typeEqual<typeof e.detail, null>;
    },
    aaa_BubblesComposed(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_CapturePhaseComposed(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_BubblesCapturePhaseComposed(e) {
      typeEqual<typeof e.detail, string>;
    },
  },
});

type custom1Expected = {
  composedEvents: {
    BubblesComposed: string | BubblesComposed;
    CapturePhaseComposed: string | CaptureComposed;
    BubblesCapturePhaseComposed: string | BubblesCaptureComposed;
  };
  // events: {
  //   aaa_str(e: Detail<string>): void;
  //   aaa_bubbles(e: Detail<string>): void;
  //   aaa_CapturePhase(e: Detail<string>): void;
  //   aaa_BubblesCapturePhase(e: Detail<null>): void;
  //   aaa_BubblesComposed(e: Detail<string>): void;
  //   aaa_CapturePhaseComposed(e: Detail<string>): void;
  //   aaa_BubblesCapturePhaseComposed(e: Detail<string>): void;
  // };
};

// 1.2 Composed事件会被返回
typeEqual<typeof custom1, custom1Expected>;

// 2.1 key可写入后缀字段(_catch,表示阻止冒泡和捕获事件)。
const custom2 = CustomComponent<{}, CompDoc>()({
  events: {
    aaa_BubblesComposed_catch(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_CapturePhaseComposed_catch(e) {
      typeEqual<typeof e.detail, string>;
    },
  },
});

// 2.2 返回没有被加后最(_catch)的Composed事件
typeEqual<typeof custom2, {
  composedEvents: {
    BubblesCapturePhaseComposed: string | BubblesCaptureComposed;
  };
  // events: {
  //   aaa_BubblesComposed_catch(e: Detail<string>): void;
  //   aaa_CapturePhaseComposed_catch(e: Detail<string>): void;
  // };
}>;

const custom3 = CustomComponent<{}, CompDoc>()({
  events: {
    aaa_BubblesComposed_catch(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_CapturePhaseComposed_catch(e) {
      typeEqual<typeof e.detail, string>;
    },
    aaa_BubblesCapturePhaseComposed_catch(e) {
      typeEqual<typeof e.detail, string>;
    },
  },
});

// 2.4 若Composed事件都被阻止则返回never
typeEqual<typeof custom3, never>;

// 3.1 基础组件基本事件参数为WMBaseEvent
CustomComponent<{}, Wm.View>()({
  events: {
    view_tap(e) {
      typeEqual<typeof e, WMBaseEvent>;
    },
    view_longtap(e) {
      typeEqual<typeof e, WMBaseEvent>;
    },
    // ...
  },
});

// 3.1 基础组件自定义事件参数为Detail<object>
CustomComponent<{}, Wm.ScrollView>()({
  events: {
    scrollView_bindscroll(e) {
      typeEqual<
        typeof e,
        Detail<{
          scrollLeft: number;
          scrollTop: number;
          scrollHeight: number;
          scrollWidth: number;
          deltaX: number;
          deltaY: number;
        }>
      >;
    },
    // ...
  },
});

// 4 可为事件自定义类型
CustomComponent<{}, Wm.View>()({
  events: {
    view_tap(e: Detail<number>) {
      typeEqual<typeof e.detail, number>;
    },
    view_longtap(e: Mark<Mock_User>) {
      typeEqual<typeof e.mark, Mock_User>;
    },
    // ...
  },
});

// 4 可为事件自定义类型
CustomComponent<{}, Wm.View>()({
  events: {
    view_tap(e: Detail<number>) {
      typeEqual<typeof e.detail, number>;
    },
    view_longtap(e: Mark<Mock_User>) {
      typeEqual<typeof e.mark, Mock_User>;
    },
    // ...
  },
});

// 5 可以调用自身事件
CustomComponent<{ methods: { aaa: () => string } }, Wm.View>()({
  methods: {
    view_xxx() {
      return 123;
    },
  },
  events: {
    view_tap(e: Detail<number>) {
      this.view_xxx();
      typeEqual<typeof e.detail, number>;
    },
  },
});
// 5 可以调用自身事件
CustomComponent<{ methods: { aaa: () => string } }, Wm.Map>()({
  methods: {
    map_xxx() {
      return 123;
    },
  },
  events: {
    map_poitap(e) {
      this.map_xxx();
      typeEqual<typeof e.detail, {
        name: string;
        longitude: number;
        latitude: number;
      }>;
    },
  },
});

const rootComponent = RootComponent()({
  customEvents: {
    rootCustomEvent: String,
    rootBubbleComposed: {
      detail: String,
      options: {
        bubbles: true,
        composed: true,
      },
    },
  },
  events: {
    rootEvent() {
      void 0;
    },
  },
  methods: {
    rootMethod() {
      void 0;
    },
  },
});
void rootComponent;
// 6 可以调用根组件方法和自定义事件的调用
CustomComponent<typeof rootComponent, Wm.Map>()({
  events: {
    map_poitap() {
      // 可以调用根组件的方法
      this.rootMethod();
      // 可以调用根组件自定义事件
      this.rootCustomEvent("detail");
      this.rootBubbleComposed("detail");
    },
  },
});

/* eslint-disable @typescript-eslint/no-unused-vars */

import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import type {
  CurrentTargetDataset,
  Detail,
  Mark,
  TargetDataset,
  WMBaseEvent,
  WMCustomEvent,
} from "../../../../types/OfficialTypeAlias";
import { nonNullable } from "../../../../utils/nonNullable";
import { typeEqual } from "../../../../utils/typeEqual";
import { RootComponent } from "../..";
import type { Bubbles, BubblesComposed, Capture, CaptureComposed } from "../../CustomEvents/CustomEventsTag";

/**
 * 1. 没有子组件文档列表时,事件参数e的类型默认为官方基础类型
 * 事件参数e可通过WMBaseEvent、WMCustomEvent、Detail、Mark等内部类型快速定义事件类型。
 */
RootComponent()({
  events: {
    // 默认基础事件类型
    onTap(e) {
      typeEqual<WMBaseEvent>()(e);
    },
    // 通过WMCustomEvent定义事件类型
    customA(
      e: WMCustomEvent<
        string,
        { markData: { id: string } },
        { currentTargetDatasetData: string },
        { targetDatasetData: number }
      >,
    ) {
      typeEqual<typeof e.detail>()(e.detail);

      const markData = nonNullable(e.mark).markData;

      typeEqual<typeof markData>()(markData);

      typeEqual<typeof e.currentTarget.dataset.currentTargetDatasetData>()(
        e.currentTarget.dataset.currentTargetDatasetData,
      );

      typeEqual<typeof e.target.dataset.targetDatasetData>()(e.target.dataset.targetDatasetData);
    },
    //  通过Detail定义detai类型
    subB(e: Detail<{ str: string }>) {
      typeEqual<typeof e.detail.str>()(e.detail.str);
    },
    //  通过Mark定义mark类型
    subC(e: Mark<{ id: string }>) {
      const markId = e.mark.id;

      typeEqual<typeof markId>()(markId);
    },
    // 通过CurrentTargetDataset定义currentTarget.dataset类型
    ddd(e: CurrentTargetDataset<{ str: string }>) {
      typeEqual<typeof e.currentTarget.dataset.str>()(e.currentTarget.dataset.str);
    },
    //  通过TargetDataset定义target.dateset类型
    eee(e: TargetDataset<{ str: string }>) {
      typeEqual<typeof e.target.dataset.str>()(e.target.dataset.str);
    },
  },
});

type $SubDocA = CreateComponentDoc<"subA", {
  events: {
    str: string;
    bubbles: number | Bubbles;
    bubblesComposed: number | BubblesComposed;
  };
}>;

type $SubDocB = CreateComponentDoc<"subB", {
  events: {
    str: string;
    capture: number | Capture;
    captureComposed: number | CaptureComposed;
  };
}>;
type $SubDocC = CreateComponentDoc<"subC", {
  events: {
    bubbles: number | Bubbles;
    bubblesComposed: number | BubblesComposed;
    capture: number | Capture;
    captureComposed: number | CaptureComposed;
  };
}>;

/**
 * 3. 当传入子组件文档列表时
 */
const RootDoc = RootComponent<[$SubDocA, $SubDocB, $SubDocC]>()({
  events: {
    // 根组件自身的基础事件
    xxx(e) {
      typeEqual<typeof e, WMBaseEvent>();
    },
    // 允许与子组件普通事件(非Bubble和非Capture事件)同名,但是当做普通事件处理。(在子组件events类型中加了与RootDoc中事件名的重复检测，即子组件事件不能与根组件事件重名)
    subA_str(e) {
      typeEqual<typeof e, WMBaseEvent>();
    },
    //  包含有Bubbles标记的事件(bubbles: number | Bubbles;) 事件名加后缀 `_bubbles`
    subA_bubbles_bubbles(e) {
      typeEqual<typeof e.detail, number>();
    },
    // 同上(bubblesComposed: number | BubblesComposed;)
    subA_bubblesComposed_bubbles(e) {
      typeEqual<typeof e.detail, number>();
    },
    // 有BubblesComposed标记的事件( bubblesComposed: number | BubblesComposed;) 还可以加 `_catch` 后缀表示阻止事件(类型向上)传递,会在组件类型中删除该事件的类型,阻止向上传递类型。
    subA_bubblesComposed_bubbles_catch(e) {
      typeEqual<typeof e.detail, number>();
    },
    // 有Capture标记的事件(capture: number | Capture;) 事件名加后缀 `_capture`
    subB_capture_capture(e) {
      typeEqual<typeof e.detail, number>();
    },
    // 同上(captureComposed: number | CaptureComposed;)
    subB_captureComposed_capture(e) {
      typeEqual<typeof e.detail, number>();
    },
    // 有CaptureComposed标记的事件(captureComposed: number | CaptureComposed;) 还可以加 `_catch` 后缀表示阻止事件(类型向上)传递,不会在组件类型中删除该事件的类型,因为捕获事件是从根组件向下传递的。
    subB_captureComposed_capture_catch(e) {
      typeEqual<typeof e.detail, number>();
    },
  },
});

// 返回所有定义事件类型
type RootDocExpect = {
  events: {
    xxx(e: WMBaseEvent): void;
    subA_str(e: WMBaseEvent): void;
    subA_bubbles_bubbles(e: Detail<number>): void;
    subA_bubblesComposed_bubbles(e: Detail<number>): void;
    subA_bubblesComposed_bubbles_catch(e: Detail<number>): void;
    subB_capture_capture(e: Detail<number>): void;
    subB_captureComposed_capture(e: Detail<number>): void;
    subB_captureComposed_capture_catch(e: Detail<number>): void;
  };
};

// 4 返回EventsDoc
typeEqual<typeof RootDoc, RootDocExpect>();

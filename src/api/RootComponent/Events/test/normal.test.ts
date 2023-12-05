import { Checking, type Test } from "hry-types";
import type {
  CurrentTargetDataset,
  Dataset,
  Detail,
  Mark,
  TargetDataset,
  WMBaseEvent,
  WMCustomEvent,
} from "../../../../types/OfficialTypeAlias";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import { RootComponent } from "../..";
import type { Bubbles, Capture } from "../../CustomEvents/CustomEventsTag";

/**
 * 1. 没有子组件时,事件参数e的类型默认为官方基础类型
 */
RootComponent()({
  events: {
    onTap(e) {
      Checking<typeof e, WMBaseEvent, Test.Pass>;
    },
  },
});

/**
 * 2. 没有子组件时,事件参数e可通过WMBaseEvent和WMCustomEvent(多一个detail类型)定义内部类型。
 */
RootComponent()({
  events: {
    // 2.1 通过WMCustomEvent定义detai,mark,CurrentTargetDataset,targetDataset数据类型
    customA(
      e: WMCustomEvent<
        { detailData: string },
        { markData: { id: string } },
        { currentTargetDatasetData: string },
        { targetDatasetData: number }
      >,
    ) {
      Checking<typeof e.detail.detailData, string, Test.Pass>;

      const markData = e.mark!.markData;

      Checking<typeof markData, { id: string }, Test.Pass>;

      Checking<typeof e.currentTarget.dataset.currentTargetDatasetData, string, Test.Pass>;

      Checking<typeof e.target.dataset.targetDatasetData, number, Test.Pass>;
    },
    // 2.2 通过Detail定义detai类型
    bbb(e: Detail<{ str: string }>) {
      Checking<typeof e.detail.str, string, Test.Pass>;
    },
    // 2.3 通过Mark定义mark类型
    ccc(e: Mark<{ id: string }>) {
      const markId = e.mark!.id;

      Checking<typeof markId, string, Test.Pass>;
    },
    // 2.4 通过CurrentTargetDataset定义currentTarget.dataset类型
    ddd(e: CurrentTargetDataset<{ str: string }>) {
      Checking<typeof e.currentTarget.dataset.str, string, Test.Pass>;
    },
    // 2.5 通过TargetDataset定义target.dateset类型
    eee(e: TargetDataset<{ str: string }>) {
      Checking<typeof e.target.dataset.str, string, Test.Pass>;
    },
  },
});

type ComponentDocA = ComponentDoc<{
  properties: {
    aaa_str: string;
  };
  customEvents: {
    aaa_str: string;
    aaa_num: number | Bubbles;
  };
}>;

type ComponentDocB = ComponentDoc<{
  customEvents: {
    bbb_str: string;
    bbb_num: number | Capture;
  };
}>;

/**
 * 3. 当传入子组件文档列表时,提供子组件的冒泡和捕获事件的字段提示
 */
const RootDoc = RootComponent<[ComponentDocA, ComponentDocB]>()({
  events: {
    // 3.1 后缀bubbles表示为子组件的冒泡事件
    aaa_num_bubbles(e) {
      Checking<typeof e.detail, number, Test.Pass>;
    },
    // 3.2 后缀加catch表示阻止事件传递,当前组件类型将不会向上传递此事件类型。
    aaa_num_bubbles_catch(e) {
      Checking<typeof e.detail, number, Test.Pass>;
    },
    // 3.3 后缀capture表示是捕获事件
    bbb_num_capture(e: Dataset<{ currentTargetDataset: number }, { targetDataset: string }, number>) {
      Checking<typeof e.detail, number, Test.Pass>;

      Checking<typeof e.currentTarget.dataset.currentTargetDataset, number, Test.Pass>;

      Checking<typeof e.target.dataset.targetDataset, string, Test.Pass>;
    },
    // 3.4 后缀加catch表示阻止事件传递,由于捕获事件向下阻止,所以当发现捕获事件不触发时应查看上级组件是否有阻止事件。
    bbb_num_capture_catch(e) {
      Checking<typeof e.detail, number, Test.Pass>;
    },
  },
});

type RootDocExpect = {
  events: {
    aaa_num_bubbles: (e: Detail<number>) => void;
    aaa_num_bubbles_catch: (e: Detail<number>) => void;
    bbb_num_capture: (e: Dataset<{ currentTargetDataset: number }, { targetDataset: string }, number>) => void;
    bbb_num_capture_catch: (e: Detail<number>) => void;
  };
};

// 4 返回EventsDoc正常
Checking<typeof RootDoc, RootDocExpect, Test.Pass>;

/**
 * 5 events字段为`{}`时,返回类型中无events字段。
 */
const EmptyEventsFields = RootComponent<[ComponentDocA, ComponentDocB]>()({
  events: {},
});

Checking<typeof EmptyEventsFields, {}, Test.Pass>;

/**
 * 6 没有events字段时,返回类型中无events字段。
 */
const NoEventsFields = RootComponent<[ComponentDocA, ComponentDocB]>()({});

Checking<typeof NoEventsFields, {}, Test.Pass>;

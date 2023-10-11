import { Checking, type Test } from "hry-types";
import { RootComponent, type SpecificType } from "../../../..";
import type { CustomEventConstraint, FullCustomEvents, ShortCustomeEvents } from "../CustomEventConstraint";
import type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
} from "../CustomEventsTag";

/**
 * customEvents字段简写配置
 */
export const mock_shortCustomEvents = {
  str: String,
  null: null,
  unionStr: String as SpecificType<"male" | "female">,
  union: [String, Number as SpecificType<0 | 1 | 2>, null],
} satisfies Record<string, ShortCustomeEvents>;

/**
 * customEvents字段带options配置
 */
export const mock_fullCustomEvents = {
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
} satisfies Record<string, FullCustomEvents>;

export const mock_customEvents = {
  ...mock_shortCustomEvents,
  ...mock_fullCustomEvents,
} satisfies CustomEventConstraint;

const rootDoc = RootComponent()({
  customEvents: mock_customEvents,
});

type RootDoc = {
  customEvents: {
    // 简写字段 即类型为事件参数e对象的detail字段类型
    str: string;
    null: null;
    unionStr: "male" | "female";
    union: string | 0 | 1 | 2 | null;
    // 带options字段 通过联合类型加入。
    bubbles: string | Bubbles;
    capturePhase: null | Capture;
    bubbles_capturePhase: string | number | BubblesCapture;
    bubbles_composed: "male" | "female" | BubblesComposed;
    capturePhase_composed: string | 0 | 1 | 2 | null | CaptureComposed;
    bubbles_capturePhase_composed: boolean | BubblesCaptureComposed;
  };
};

// 1 RootDoc中customEventsDoc 类型为事件参数e的detail类型和事件标记的联合(冒泡|穿透|捕获)
Checking<typeof rootDoc, RootDoc, Test.Pass>;

const rootDocEmpty = RootComponent()({
  customEvents: {},
});

// 2. customEvents字段配置为`{}`时,Doc中无customEvents字段
Checking<typeof rootDocEmpty, {}, Test.Pass>;

const rootDocNoFields = RootComponent()({});

// 3. 无customEvents字段时,Doc中无customEvents字段
Checking<typeof rootDocNoFields, {}, Test.Pass>;

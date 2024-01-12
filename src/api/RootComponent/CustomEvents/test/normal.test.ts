import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/ReadonlyDeep";
import { type DetailedType, RootComponent } from "../../../..";
import type { Mock_User } from "../../Properties/test/normalRequired.test";
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
  nothing: undefined,
  null: null,
  unionStr: String as DetailedType<"male" | "female">,
  union: [String, Number as DetailedType<0 | 1 | 2>, null],
  obj: Object as DetailedType<Mock_User>,
} satisfies Record<string, ShortCustomeEvents>;

/**
 * customEvents字段带options配置
 */
export const mock_fullCustomEvents = {
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
    // 简写字段 值类型为事件参数e的detail类型
    str: string;
    null: null;
    nothing: undefined;
    unionStr: "male" | "female";
    union: string | 0 | 1 | 2 | null;
    obj: ReadonlyDeep<Mock_User>;
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

// 4 实例中的对象数组都是readOnlyDeep类型,可以传递给自定义做参数
RootComponent()({
  properties: {
    obj: Object as DetailedType<Mock_User>,
  },
  data: {
    obj1: {} as Mock_User,
    _ddd: {} as Mock_User,
  },
  customEvents: mock_customEvents,
  events: {
    ddd() {
      this.obj(this.data.obj!);

      this.obj(this.data.obj1);
    },
  },
});

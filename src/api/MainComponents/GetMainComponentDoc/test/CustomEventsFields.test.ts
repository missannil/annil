import { ValueChecking } from "hry-types";
import type { SpecificType } from "../../../..";
import { MainComponent } from "../..";
import type {
  BubblesCapturePhaseComposedSign,
  BubblesComposedSign,
  BubblesSign,
  CapturePhaseComposedSign,
  CapturePhaseSign,
} from "../../CustomEvents/SignForCustomEvents";

/**
 * MainComponent中isPage字段默认类型为false,无isPage字段或为false时表示MainComponent为组件模式。
 * 组件中只有customEvents字段
 */
const onlyCustomEventsInComponent = MainComponent({
  customEvents: {
    num: Number,
    str: String as SpecificType<"male" | "female">,
    union: [String, Number as SpecificType<0 | 1 | 2>],
    isNull: null,
    bubbles: {
      detailType: Boolean,
      options: {
        bubbles: true,
      },
    },
    capturePhase: {
      detailType: Boolean,
      options: {
        capturePhase: true,
      },
    },
    bubbles_composed: {
      detailType: Boolean,
      options: {
        bubbles: true,
        composed: true,
      },
    },
    capturePhase_composed: {
      detailType: Boolean,
      options: {
        capturePhase: true,
        composed: true,
      },
    },
    bubbles_composed_capturePhase: {
      detailType: Boolean,
      options: {
        bubbles: true,
        composed: true,
        capturePhase: true,
      },
    },
  },
});

/**
 * onlyCustomEventsInComponent的预期类型
 */
type OnlyCustomEventsInComponentExpect = {
  customEvents: {
    num: number;
    str: "male" | "female";
    union: string | 0 | 1 | 2;
    isNull: null;
    bubbles: boolean | BubblesSign;
    capturePhase: boolean | CapturePhaseSign;
    bubbles_composed: boolean | BubblesComposedSign;
    capturePhase_composed: boolean | CapturePhaseComposedSign;
    bubbles_composed_capturePhase: boolean | BubblesCapturePhaseComposedSign;
  };
};

/**
 * 验证 OnlyCustomEventsInComponentExpect 和 onlyCustomEventsInComponent 类型是否一致
 */
ValueChecking<OnlyCustomEventsInComponentExpect>()(onlyCustomEventsInComponent);

/**
 * 组件中customEvents字段是空对象时
 */
const customEventsIsEmptyObjectInComponent = MainComponent({ customEvents: {} });

/**
 * customEventsIsEmptyObjectInComponent 的预期类型
 */
type customEventsIsEmptyObjectInComponentExpect = {};

/**
 * 验证 customEventsIsEmptyObjectInComponentExpect 和 customEventsIsEmptyObjectInComponent 类型是否一致
 */
ValueChecking<customEventsIsEmptyObjectInComponentExpect>()(customEventsIsEmptyObjectInComponent);

/**
 * 页面中customEvents字段默认约束为never
 */
const onlyCustomEventsInPage = MainComponent({
  isPage: true,
  customEvents: {} as never,
});

/**
 * onlyCustomEventsInPage的预期类型
 */
type OnlyCustomEventsInPageExpect = {
  isPage: true;
};

/**
 * 验证 OnlyCustomEventsInPageExpect 和 onlyCustomEventsInPage 类型是否一致
 */
ValueChecking<OnlyCustomEventsInPageExpect>()(onlyCustomEventsInPage);

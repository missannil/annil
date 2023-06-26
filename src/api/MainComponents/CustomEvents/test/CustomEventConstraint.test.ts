import type { SpecificType } from "../../../..";
import type { CustomEventConstraint, FullCustomEvents, ShortCustomeEvents } from "../CustomEventConstraint";

/**
 * 自定义事件字段简写示例
 */
export const mock_shorCustomEvents = {
  str: String,
  null: null,
  unionStr: String as SpecificType<"male" | "female">,
  list: [String, Number as SpecificType<0 | 1 | 2>, null],
} satisfies Record<string, ShortCustomeEvents>;

/**
 *  自定义事件字段全写示例
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

/**
 * 错误的字段示例
 */
const error_fields_of_customEvents = {
  // @ts-expect-error options 没有options字段,不要写对象形式。
  error1: {
    detailType: Boolean,
  },
  // @ts-expect-error options 不可以为空对象 无意义
  error2: {
    detailType: Boolean,
    options: {},
  },
  // @ts-expect-error false字段不要写 默认false
  error3: {
    detailType: Boolean,
    options: { bubbles: false },
  },
  // @ts-expect-error false字段不要写 默认false
  error4: {
    detailType: Boolean,
    options: { capturePhase: false },
  },
  // @ts-expect-error composed字段不可以单独开启,必须存在 bubbles或capturePhase为true时
  error5: {
    detailType: Boolean,
    options: { composed: true },
  },
} satisfies CustomEventConstraint;

error_fields_of_customEvents;

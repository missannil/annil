import type { FullEvent } from "./CustomEventConstraint";

declare const Composed: unique symbol;

declare const Bubbles: unique symbol;
// 使用函数返回可在提示中显示类型别名,IsComposed 和 IsBubbles
export type IsComposed = () => typeof Composed;
export type IsBubbles = () => typeof Bubbles;
// export type IsComposed = typeof Composed;
// export type IsBubbles = typeof Bubbles;

export type SignForCustomEvents<Options extends FullEvent["options"]> = Options["composed"] extends true ? IsComposed
  : Options["bubbles"] extends true ? IsBubbles
  : never;

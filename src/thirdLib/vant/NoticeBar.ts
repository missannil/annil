import type { CreateComponentDoc } from "../../types/CreateComponentDoc";

export type CssVar<T extends string = string> = `var(--${T}-${string})`;

export type HEX = `#${number}`;

export type RGBA = `rgba(${number},${number},${number},${number})`;

export type RGB = `rgb(${number},${number},${number})`;

export type TWClass = `${string}-${string}`;

export type Color = RGBA | HEX | RGB | CssVar<"color">;

// 链接： https://github.com/youzan/vant-weapp/blob/dev/packages/notice-bar/README.md
export type NoticeBar = CreateComponentDoc<"noticeBar", {
  properties: {
    // 通知栏模式，可选值为 closeable link
    mode?: "closeable" | "link";
    text?: string;
    url?: string;
    openType?: string;
    delay?: number;
    speed?: number;
    scrollable?: boolean;
    leftIcon?: string;
    color?: CssVar<"color">;
    backgroundColor?: CssVar<"color">;
    background?: string;
    wrapable?: boolean;
  };
}>;

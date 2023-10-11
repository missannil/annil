import type { CreateComponentDoc } from "../../types/CreateComponentDoc";

type CssVar<T extends string = string> = `var(--${T}-${string})`;

type Color = `rgba(${number}, ${number}, ${number}, ${number})` | `#${number}` | CssVar<"color">;

type ChangeEventDetail = {
  current: number;
  currentItemId: string;
  source: "touch" | "" | "autoplay";
};

type AnimationfinishEventDetail = ChangeEventDetail;

export type Swiper = CreateComponentDoc<"swiper", {
  properties: {
    list: unknown[];
    class?: string;
    style?: string;
    /**
     * 是否显示面板指示点
     * @defaultValue false
     */
    indicator_dots?: boolean;

    /**
     * 指示点颜色
     * @defaultValue 'rgba(0, 0, 0, .3)'
     */
    indicatorColor?: Color;
    /**
     * 当前选中的指示点颜色
     * @defaultValue "#000000"
     */
    indicatorActiveColor?: Color;
    /**
     * 是否自动切换
     * @defaultValue false
     */
    autoplay?: boolean;
    /**
     * 当前所在滑块的 index
     * @defaultValue  0
     */
    current?: number;
    /**
     * 自动切换时间间隔
     * @defaultValue 5000
     */
    interval?: number;
    /**
     * 滑动动画时长
     * @defaultValue 500
     */
    duration?: number;
    /**
     * 是否采用衔接滑动
     * @defaultValue false
     */
    circular?: boolean;
    /**
     * 滑动方向是否为纵向
     * @defaultValue false
     */
    vertical?: boolean;
    /**
     * 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
     * @defaultValue '0px'
     */
    previousMargin?: string;
    /**
     * 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
     * @defaultValue '0px'
     */
    nextMargin?: string;
    /**
     * 当 swiper-item 的个数大于等于 2，关闭 circular 并且开启 previous-margin 或 next-margin 的时候，可以指定这个边距是否应用到第一个、最后一个元素
     * @defaultValue false
     */
    snapToEdge?: boolean;
    /**
     * 同时显示的滑块数量
     * @defaultValue 1
     */
    displayMultipleItems?: number;
    /**
     * 指定 swiper 切换缓动动画类型
     * @defaultValue 'defaultValue'
     */
    easingFunction?: "defaultValue" | "linear" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic";
  };
  customEvents: {
    /**
     * current 改变时会触发 change 事件，event.detail = `{current, source}`
     */
    change: ChangeEventDetail;
    /**
     * swiper-item 的位置发生改变时会触发 transition 事件，event.detail = `{dx: number, dy: number}`
     */
    transition: { dx: number; dy: number };
    /**
     * animationfinish 动画结束时会触发 animationfinish 事件，event.detail change字段
     */
    animationfinish: AnimationfinishEventDetail;
  };
}>;

import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { CreateComponentDoc } from "../../types/CreateComponentDoc";

export type ScrollView = CreateComponentDoc<"scrollView", {
  properties: {
    class?: string;
    style?: string;
    // 允许横向滚动
    scroll_x?: boolean;
    // 允许纵向滚动
    scroll_y?: boolean;
    // 距顶部/左边多远时，触发 scrolltoupper 事件 默认50
    upper_threshold?: number | string;
    // 距底部/右边多远时，触发 scrolltolower 事件 默认50
    lower_threshold?: number | string;
    // 设置竖向滚动条位置
    scroll_top?: number | string;
    // 设置横向滚动条位置
    scroll_left?: number | string;
    // 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
    scroll_into_view?: string;
    // 在设置滚动条位置时使用动画过渡 默认 false
    scroll_with_animation?: boolean;
    // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向 默认false
    enable_back_to_top?: boolean;
    // 启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其孩子节点。
    enable_flex?: boolean;
    // 默认false 开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效，安卓下可参考 CSS overflow-anchor 属性
    scroll_anchoring?: boolean;
    // 开启自定义下拉刷新
    refresher_enabled?: boolean;
    // 设置自定义下拉刷新阈值 默认45
    refresher_threshold?: number;
    //  设置自定义下拉刷新默认样式，默认 "black" 支持设置 black | white | none， none 表示不使用默认样式
    refresher_default_style?: string;
    // 设置自定义下拉刷新区域背景颜色 默认"#FFF"
    refresher_background?: string;
    // 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
    refresher_triggered?: boolean;
    // 启用 scroll-view 增强特性，启用后可通过 ScrollViewContext 操作 scroll-view 2.12.0
    enhanced?: boolean;
    // 默认true  iOS 下 scroll-view 边界弹性控制 (同时开启 enhanced 属性后生效)
    bounces?: boolean;
    // 默认true 滚动条显隐控制 (同时开启 enhanced 属性后生效)
    show_scrollbar?: boolean;
    // 分页滑动效果 (同时开启 enhanced 属性后生效)
    paging_enabled?: boolean;
    // 滑动减速速率控制 (同时开启 enhanced 属性后生效)
    fast_deceleration?: boolean;
  };
  customEvents: {
    // 滑动开始事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }
    binddragstart: { scrollTop: number; scrollLeft: number };
    // 滑动事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft }
    binddragging: { scrollTop: number; scrollLeft: number };
    // 滑动结束事件 (同时开启 enhanced 属性后生效) detail { scrollTop, scrollLeft, velocity }
    binddragend: { scrollTop: number; scrollLeft: number; velocity: number };
    // 滚动到顶部/左边时触发
    bindscrolltoupper: EmptyObject;
    // 滚动到底部/右边时触发
    bindscrolltolower: EmptyObject;
    // 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
    bindscroll: {
      scrollLeft: number;
      scrollTop: number;
      scrollHeight: number;
      scrollWidth: number;
      deltaX: number;
      deltaY: number;
    };
    // 自定义下拉刷新控件被下拉
    bindrefresherpulling: EmptyObject;
    // 自定义下拉刷新被触发
    bindrefresherrefresh: EmptyObject;
    // 自定义下拉刷新被复位
    bindrefresherreState: EmptyObject;
    // 自定义下拉刷新被中止
    bindrefresherabort: EmptyObject;
  };
}>;
// Bug & Tip
// tip: 基础库 2.4.0以下不支持嵌套textarea、map、canvas、video 组件
// tip: scroll-into-view 的优先级高于 scroll-top
// tip: 在滚动 scroll-view 时会阻止页面回弹，所以在 scroll-view 中滚动，是无法触发 onPullDownRefresh
// tip: 若要使用下拉刷新，请使用页面的滚动，而不是 scroll-view ，这样也能通过点击顶部状态栏回到页面顶部
// tip: scroll-view 自定义下拉刷新可以结合 WXS 事件响应 开发交互动画

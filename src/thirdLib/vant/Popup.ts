import type { CreateComponentType } from "../../types/CreateComponentType";

type Position = "top" | "bottom" | "left" | "right";

export type Popup = CreateComponentType<"popup", {
  properties: {
    /**
     *  是否显示弹出层
     */
    show: boolean;
    /**
     *  z-index 层级
     */
    zIndex?: number;
    /**
     * 弹出位置  top bottom right left 默认 居中
     */
    position?: Position;
    /**
     *  是否显示遮罩层
     */
    overlay?: boolean;
    /**
     * 动画时长，单位为毫秒
     */
    duration?: number;
    /** */
    round?: boolean;

    /**
     * 自定义弹出层样式
     */
    customStyle?: string;

    /**
     * 自定义遮罩层样式
     */
    overlayStyle?: string;

    /**
     * 是否在点击遮罩层后关闭
     */
    closeOnClickOverlay?: boolean;
    /**
     * 是否显示关闭图标
     */
    closeable?: boolean;
    /**
     * 关闭图标名称或图片链接
     */
    closeIcon?: string;

    /**
     * 是否为 iPhoneX 留出底部安全距离 true
     */
    safeAreaInsetBottom?: boolean;
    /**
     * 是否留出顶部安全距离（状态栏高度） false
     */
    safeAreaInsetTop?: boolean;
    /**
     * 是否锁定背景滚动 true
     */
    lockScroll?: boolean;
  };
  customEvents: {
    clickOverlay: null;
    close: null; // ddd
  };
}>;

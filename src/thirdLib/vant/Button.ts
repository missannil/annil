import type { CreateComponentType } from "../../types/CreateComponentType";

export type Button = CreateComponentType<"button", {
  properties: {
    /**
     * 标识符
     */
    id?: string;
    /**
     * 按钮类型
     */
    type?: "primary" | "warning" | "danger" | "info";
    /**
     * 按钮尺寸
     */
    size?: "normal" | "large" | "small" | "mini";
    /**
     * 按钮颜色 支持传入linear-gradient渐变色
     */
    color?: string;
    // ...没写全
  };
}>;

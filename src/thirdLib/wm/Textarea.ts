import type { CreateComponentType } from "../../types/CreateComponentType";
type ConfirmType = "send" | "search" | "next" | "go" | "done" | "return";

export type Textarea = CreateComponentType<"textarea", {
  properties: {
    /**
     * 输入框的内容 1.0.0
     */
    value?: string;
    /**
     * 输入框为空时占位符 1.0.0
     */
    placeholder?: string;
    /**
     * 指定 placeholder 的样式类，目前仅支持color,font-size和font-weight	1.0.0
     */
    placeholderClass?: string;
    /**
     * 指定 placeholder 的样式，目前仅支持color,font-size和font-weight 1.0.0
     */
    placeholderStyle?: string;
    /**
     * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true	1.0.0
     */
    fixed?: boolean;
    /**
     * 是否禁用输入框 1.0.0
     */
    disabled?: boolean;
    /**
     * 	默认140	否	最大输入长度，设置为 -1 的时候不限制最大长度	1.0.0
     */
    maxlength?: number;
    /**
     * 自动聚焦，拉起键盘 1.0.0
     */
    autoFocus?: boolean;
    /**
     * 获取焦点 1.0.0
     */
    focus?: boolean;
    /**
     * 是否自动增高，设置auto-height时，style.height不生效 1.0.0
     */
    autoHeight?: boolean;
    /**
     * 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 1.0.0
     */
    cursorSpacing?: number;
    /**
     * 指定focus时的光标位置 1.5.0
     */
    cursor?: number;
    /**
     * 光标起始位置，自动聚集时有效，需与selection-end搭配使用 1.9.0
     */
    selectionStart?: number;
    /**
     * 光标结束位置，自动聚集时有效，需与selection-start搭配使用 1.9.0
     */
    selectionEnd?: number;
    /**
     * 键盘弹起时，是否自动上推页面 1.9.90
     */
    adjustPosition?: boolean;
    /**
     * focus时，点击页面的时候不收起键盘 2.8.2
     */
    holdKeyboard?: boolean;
    /**
     * 是否去掉 iOS 下的默认内边距 2.10.0
     */
    disableDefaultPadding?: boolean;
    /**
     * 设置键盘右下角按钮的文字	2.13.0
     */
    confirmType?: ConfirmType;
    /**
     * 点击键盘右下角按钮时是否保持键盘不收起 2.16.0
     */
    confirmHold?: boolean;
    /**
     * 键盘对齐位置 2.16.1 cursor	对齐光标位置 bottom	对齐输入框底部
     */
    adjustKeyboardTo?: "cursor" | "bottom";
    /**
     * 是否显示键盘上方带有”完成“按钮那一栏 1.6.0
     */
    showConfirmBar?: boolean;
  };
  customEvents: {
    /**
     * 输入框行数变化时调用 1.0.0
     */
    linechange: { height: number; heightRpx: number; lineCount: number };
    /**
     * 当键盘输入时，触发 input 事件 1.0.0
     */
    input: { value: string; cursor: number; keyCode: number };
    /**
     * 输入框聚焦时触发 1.0.0
     */
    focus?: { value: string; height: number };
    /**
     * 输入框失去焦点时触发 1.0.0
     */
    blur?: { value: string; cursor: number };
    /**
     * 点击完成时， 触发 confirm 事件 1.0.0
     */
    confirm?: { value: string };
    /**
     * 键盘高度发生变化的时候触发此事件， 2.7.0
     */
    keyboardheightchange?: { height: number; duration: number };
  };
}>;

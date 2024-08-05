import type { CreateComponentType } from "../../types/CreateComponentType";

export type Textarea = CreateComponentType<"textarea", {
  properties: {
    /**
     * 输入框的内容
     */
    value?: string;
    /**
     * 最大输入长度，设置为 -1 的时候不限制最大长度 默认140
     */
    maxlength?: number;
    /**
     * 输入框为空时占位符
     */
    placeholder?: string;
  };
  customEvents: {
    linechange: { height: number; heightRpx: number; lineCount: number };
    input: { value: string; cursor: number };
  };
}>;

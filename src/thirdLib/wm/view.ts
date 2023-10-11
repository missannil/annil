import type { CreateComponentDoc } from "../../types/CreateComponentDoc";

export type View = CreateComponentDoc<"view", {
  properties: {
    class?: string;
    style?: string;
    /**
     * 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果
     * @defaultValue 'none'
     */
    hover_class?: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     * @defaultValue false
     */
    hover_stop_propagation?: boolean;
    /**
     * 按住后多久出现点击态，单位毫秒
     * @defaultValue 50
     */
    hover_start_time?: number;
    /**
     * 手指松开后点击态保留时间，单位毫秒
     * @defaultValue 400
     */
    hover_stay_time?: number;
  };
}>;

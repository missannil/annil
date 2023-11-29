import type { WMCompLifetimes } from "../../../types/OfficialTypeAlias";
import type { FinalOptionsForComponent } from "../../DefineComponent";

export type LifetimesConstraint = // 官方组件生命周期
  & WMCompLifetimes["lifetimes"]
  & {
    /**
     * 建立组件时的真正配置对象
     */
    beforeCreate?: (options: FinalOptionsForComponent) => void;
  };

import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { WMCompLifetimes } from "../../../types/OfficialTypeAlias";
import type { FinalOptionsOfComponent } from "../../DefineComponent/collectOptionsForComponent";

export type LifetimesConstraint = // 官方组件生命周期
  ComputeIntersection<
    & WMCompLifetimes["lifetimes"]
    & {
      /**
       * 建立组件时的真正配置对象
       */
      beforeCreate?: (options: FinalOptionsOfComponent) => void;
    }
  >;

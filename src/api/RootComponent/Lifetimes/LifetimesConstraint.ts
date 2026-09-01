import type { _SimplifyIntersection } from "hry-types";
import type { WMCompLifetimes } from "../../../types/OfficialTypeAlias";
import type { FinalOptionsOfComponent } from "../../DefineComponent/normalizeOptions";

export type LifetimesConstraint = // 官方组件生命周期
  _SimplifyIntersection<
    & WMCompLifetimes["lifetimes"]
    & {
      /**
       * 建立组件时的真正配置对象
       */
      beforeCreate?: (this: undefined, options: FinalOptionsOfComponent) => void;
    }
  >;

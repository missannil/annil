import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Includes } from "../../../types/includes";

/**
 * 根据IsPage,生成name或path字段
 */
export type NameOrPageOption<
  TName extends string,
  TPath extends `/${string}`,
  IsPage extends boolean,
> = IsPage extends true ? {
    /**
     * 页面路径已'/'开头
     */
    path: TPath;
  }
  : {
    /**
     * 组件名不可为空串和含有下划线
     */
    name:
      & TName
      & IfExtends<
        TName,
        "",
        () => "⚠️组件名不可为空⚠️",
        IfExtends<Includes<TName, "_">, true, () => "⚠️组件名不可包含下划线 _ ⚠️", unknown>
      >;
  };

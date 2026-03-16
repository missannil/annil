import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Includes } from "../../../types/includes";

/**
 * 根据IsPage,生成name或path字段
 */
export type NameOrPathOption<
  TName extends string,
  TPath extends `/${string}`,
  IsPage extends boolean,
> = IsPage extends true ? {
    /**
     * 页面路径
     * @remarks 必须以斜杠`/`开头
     */
    path: TPath;
  }
  : {
    /**
     * 组件名
     * @remarks 不可为空串和含有下划线
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

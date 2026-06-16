import type { IfEquals, IfExtends } from "hry-types/src/Any/_api";
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
     * @remarks 不可为空串或包含下划线或空格
     */
    name:
      & TName
      & IfExtends<
        TName,
        "",
        () => "⚠️组件名不可为空⚠️",
        IfEquals<Includes<TName, "_" | " ">, true, () => "⚠️组件名不可包含下划线或空格⚠️", unknown>
      >;
  };

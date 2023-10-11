import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { RootComponentDoc } from "../../RootComponent/RootComponentDoc";

/**
 * 根据TRootComponent类型,生成name或path字段
 * @remarks RootComponentDoc为页面时(isPage为true),返回path字段,否则返回name字段
 * @returns  `{ name: TName } or { path: TPage }`
 */
export type NameOrPageOption<
  TName extends string,
  TPath extends `/${string}`,
  TRootComponent extends RootComponentDoc,
> = TRootComponent["isPage"] extends true ? {
    /**
     * 页面路径已'/'开头
     */
    path: TPath;
  }
  : {
    /**
     * 组件名不可为空
     */
    name: TName & IfExtends<TName, "", () => "⚠️组件名不可为空⚠️", unknown>;
  };

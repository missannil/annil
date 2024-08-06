import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { RootComponentTrueOptions } from "../RootComponent";
import type { RootComponentDoc } from "../RootComponent/RootComponentDoc";
import type { SubComponentDoc } from "../SubComponent/SubComponentDoc";
import type { NameOrPathOption } from "./NameOrPage/NameOrPathOption";
import { normalizeOptions } from "./normalizeOptions";
import type { CreateComponentDoc } from "./ReturnType/CreateComponentDoc";
import type { CreatePageDoc } from "./ReturnType/CreatePageDoc";
import type { RootComponentOption } from "./RootComponent/RootComponentOption";
import type { SubComponentsOption } from "./SubComponents/SubComponentsOption";
export type Path = `/${string}`;

type RootOptions<
  TRootComponentDoc extends RootComponentDoc,
  TSubComponentTuple extends SubComponentDoc[],
  TName extends string,
  TPath extends Path,
> =
  & NameOrPathOption<TName, TPath, TRootComponentDoc["isPage"] & {}>
  & RootComponentOption<TRootComponentDoc>
  & SubComponentsOption<TSubComponentTuple>;

type DefineComponentConstructor = <
  TRootComponentDoc extends RootComponentDoc = {},
  TSubComponentTuple extends SubComponentDoc[] = [],
  TName extends string = "",
  TPath extends Path = "/",
>(
  options: RootOptions<TRootComponentDoc, TSubComponentTuple, TName, TPath>,
) => // ReturnType 为  PageDoc or ComponentDoc
IfExtends<
  "",
  TName,
  // 生成页面文档
  CreatePageDoc<TRootComponentDoc, TPath>,
  // 生成组件文档
  CreateComponentDoc<TRootComponentDoc, TName, TSubComponentTuple>
>;

export type DefineComponentOption = {
  name?: string;
  path?: string;
  rootComponent?: RootComponentTrueOptions;
  subComponents?: SubComponentDoc[];
};

/**
 * 把根组件选项和子组件选项转化为原生Component API选项并执行
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DefineComponent: DefineComponentConstructor = function(options): any {
  Component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalizeOptions(options as DefineComponentOption) as any,
  );
};

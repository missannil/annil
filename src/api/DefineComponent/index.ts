import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Func } from "hry-types/src/Misc/Func";
import type { WMComponent, WMCompPageLifetimes, WMPageLifetimes } from "../../types/OfficialTypeAlias";

import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { RootComponentDoc } from "../RootComponent/RootComponentDoc";
import type { SubComponentDoc } from "../SubComponent/SubComponentDoc";
import type { NameOrPageOption as NameOrPathOption } from "./NameOrPage/NameOrPathOption";
import type { CreateComponentDoc } from "./ReturnType/CreateComponentDoc";
import type { CreatePageDoc } from "./ReturnType/CreatePageDoc";
import type { RootComponentOption } from "./RootComponent/RootComponentOption";
import type { SubComponentsOption } from "./SubComponents/SubComponentsOption";

import type { RootComponentTrueOptions } from "../RootComponent";
import { collectOptionsForComponent } from "./collectOptionsForComponent";

type Path = `/${string}`;

type RootOptions<
  TRootComponentDoc extends RootComponentDoc,
  TSubComponentTuple extends SubComponentDoc[],
  TName extends string,
  TPath extends Path,
> =
  & NameOrPathOption<TName, TPath, TRootComponentDoc>
  & RootComponentOption<TRootComponentDoc>
  & SubComponentsOption<TSubComponentTuple>;

interface DefineComponentConstructor {
  <
    TRootComponentDoc extends RootComponentDoc = {},
    TSubComponentTuple extends SubComponentDoc[] = [],
    TName extends string = "",
    TPath extends Path = "/",
  >(
    options: RootOptions<TRootComponentDoc, TSubComponentTuple, TName, TPath>,
  ): // ReturnType 为  PageDoc or ComponentDoc
  IfExtends<
    "",
    TName,
    // 生成页面文档
    CreatePageDoc<TRootComponentDoc, TPath>,
    // 生成组件文档
    CreateComponentDoc<TRootComponentDoc, TName, TSubComponentTuple>
  >;
}

/**
 * 临时的函数配置项
 * 把根组件与子组件中配置类型为函数的相同字段配置收集在一起(数组)
 */
export type FuncOptions = Record<"pageLifetimes" | "lifetimes" | "watch", Record<string, Func[]>>;

/**
 * 最终传入原生Component的配置项
 */
export type FinalOptionsForComponent = {
  isPage?: boolean;
  options?: WMComponent.Options;
  properties?: Record<string, any>;
  data?: object;
  store?: object;
  computed?: Record<string, Func>;
  observers?: Record<string, Func>;
  behaviors?: string[];
  methods?: Record<string, Func> & { __storeConfig__?: Func };
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: Func } & WMPageLifetimes>;
};

export const DefineComponent: DefineComponentConstructor = function(options): any {
  Component(
    collectOptionsForComponent(options.rootComponent as RootComponentTrueOptions | undefined, options.subComponents),
  );
};

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Func } from "hry-types/src/Misc/Func";
import { BBeforeCreate } from "../../behaviors/BbeforeCreated";
import { BComputedAndWatch } from "../../behaviors/BComputedAndWatch";
import { initComputed } from "../../behaviors/BComputedAndWatch/initComputed";
import { BStore } from "../../behaviors/BStore";
import type { WMComponent, WMCompPageLifetimes, WMPageLifetimes } from "../../types/OfficialTypeAlias";
import { isEmptyObject } from "../../utils/isEmptyObject";
import {
  excludeFields,
  funcConfigHandle,
  onLoadHijack,
  onLoadReceivedDataHandle,
  rootComponentFieldHandle,
  subComponentsHandle,
} from "../../utils/preprocessingOptions";
import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { RootComponentDoc } from "../RootComponent/RootComponentDoc";
import type { SubComponentDoc } from "../SubComponent/SubComponentDoc";
import type { NameOrPageOption as NameOrPathOption } from "./NameOrPage/NameOrPathOption";
import type { CreateComponentDoc } from "./ReturnType/CreateComponentDoc";
import type { CreatePageDoc } from "./ReturnType/CreatePageDoc";
import type { RootComponentOption } from "./RootComponent/RootComponentOption";
import type { SubComponentsOption } from "./SubComponents/SubComponentsOption";

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
    CreatePageDoc<TRootComponentDoc, TPath, TSubComponentTuple>,
    // 生成组件文档
    CreateComponentDoc<TRootComponentDoc, TName, TSubComponentTuple>
  >;
}

/**
 * 临时的函数配置项
 * 把根组件与子组件中配置类型为函数的相同字段配置收集在一起(数组)
 */
export type FuncConfig = {
  pageLifetimes?: Record<string, Func[]>;
  lifetimes?: Record<string, Func[]>;
  watch?: Record<string, Func[]>;
};

/**
 * 传入原生Component的配置项
 */
export type ComponentOptions = {
  isPage?: boolean;
  options?: WMComponent.Options;
  properties?: object;
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

export type Path = `/${string}`;

export type DefineComponentOptions = {
  path?: Path;
  name?: string;
  rootComponent?: RootComponentDoc;
  subComponents?: SubComponentDoc[];
};

export const DefineComponent: DefineComponentConstructor = function(options): any {
  // console.log("------------------------------------------------分割线------------------------------------------------");

  // 最终的配置
  const componentOptions: ComponentOptions = {
    options: {
      // addGlobalClass: true,
      multipleSlots: true,
      pureDataPattern: /^_/,
      virtualHost: true,
    },
    // default behaviors
    behaviors: [BStore, BComputedAndWatch],
  };
  /**
   * 有些选项配置是函数,且可能分布在根组件和子组件中,tempConfig 用于收集这些配置,最终再一起整合进componentOptions配置。rootComponentHandle和subComponentsHandle都会收集配置，funcConfigHandle整理配置。
   */
  const funcConfig: FuncConfig = {};

  if (options.rootComponent && !isEmptyObject(options.rootComponent)) {
    rootComponentFieldHandle(options.rootComponent, componentOptions, funcConfig);
  }

  if (options.subComponents && !isEmptyObject(options.subComponents)) {
    subComponentsHandle(componentOptions, options.subComponents, funcConfig);
  }
  if (!isEmptyObject(funcConfig)) {
    funcConfigHandle(componentOptions, options.rootComponent?.isPage, funcConfig);
  }

  componentOptions.methods && excludeFields(componentOptions.methods, ["disposer", "applySetData"]);

  componentOptions.behaviors!.push(BBeforeCreate);

  onLoadHijack(componentOptions, [onLoadReceivedDataHandle, initComputed], []);

  if (componentOptions.isPage) {
    Reflect.deleteProperty(componentOptions.options!, "virtualHost");
  }
  Component(componentOptions as any);
};

export type PageOptions = {
  path: Path;
  rootComponent: RootComponentDoc & { isPage: true };
  subComponents: SubComponentDoc[];
};

export type CompOptions = {
  name: string;
  rootComponent: RootComponentDoc & { isPage: undefined };
  subComponents: SubComponentDoc[];
};

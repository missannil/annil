import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { WMCompLifetimes, WMCompPageLifetimes, WMPageLifetimes } from "../../types/officialAlias";
import { configIntegration, rootComponentHandle, subComponentsHandle } from "../../utils/preprocessingOptions";
import type { RootComponentDoc } from "../RootComponent/RootComponentDoc";
import type { SubComponentDoc } from "../SubComponent/SubComponentDoc";
import type { NameOrPageOption as NameOrPathOption } from "./NameOrPage/NameOrPathOption";
import type { CreateComponentDoc } from "./ReturnType/CreateComponentDoc";
import type { CreatePageDoc } from "./ReturnType/CreatePageDoc";
import type { RootComponentOption } from "./RootComponent/RootComponentOption";
import type { SubComponentsOption } from "./SubComponents/SubComponentsOption";

type Path = `/${string}`;

type Options<
  TRootComponentDoc extends RootComponentDoc,
  TSubComponentTuple extends SubComponentDoc[],
  TName extends string,
  TPath extends Path,
> =
  & NameOrPathOption<TName, TPath, TRootComponentDoc>
  & RootComponentOption<TRootComponentDoc>
  & SubComponentsOption<TSubComponentTuple>;

interface Constructor {
  <
    TRootComponentDoc extends RootComponentDoc = {},
    TSubComponentTuple extends SubComponentDoc[] = [],
    TName extends string = "",
    TPath extends Path = "/",
  >(
    options: Options<TRootComponentDoc, TSubComponentTuple, TName, TPath>,
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

export type FinalOptions = {
  data: Record<string, unknown>;
  computed: Record<string, Function>;
  event: Record<string, Function>;
  methods: Record<string, Function>;
  watch: Record<string, Function>;
  lifetimes: WMCompLifetimes["lifetimes"];
  pageLifetimes: Partial<WMCompPageLifetimes & { load: Function } & WMPageLifetimes>;
};

export const DefineComponent: Constructor = function(options): any {
  options;

  const finalOptions: FinalOptions = {
    data: {},
    computed: {},
    event: {},
    methods: {},
    watch: {},
    lifetimes: {},
    pageLifetimes: {},
  };

  configIntegration(finalOptions, options, [
    rootComponentHandle,
    subComponentsHandle,
  ]);

  // 合并 subComponents到options

  // fieldsHandle(options, [
  //   mainComponentHandle,
  //   mergeInjectOption,
  //   deleteNameFiled,
  //   initInherit,
  //   customEventsHandle,
  //   eventsHandle,
  //   pageLifetimesHandle,
  //   transformSubComponentsToBehaviors,
  //   addBehaviors([BinitResponseData, BAddIsSetDataToIns, BComputedAndWatch, beforeCreateAndAttach]),
  // ]);

  // attachedHijack(options as any, [createResponseData, isPageCheck, collectCompLifetime_load, collectInherit]);
  // detachedHijack(options as any, [destroyResponsive]);
  // compLoadHijack(options as any, [compInheritCacheHandle]);
  // pageOnLoadHijack(options as any, [PageReceivedDataHandle, pageInheritCacheHandle], [triggerCompLoad]);
  // return Component(options as any);
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

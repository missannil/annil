import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { MainComponentDoc } from "../../common_types/MainComponentDoc";
import type { SubComponentDoc } from "../../common_types/SubComponentDoc";
import type { CreateDoc } from "./CreateDoc";

type Options<
  TSubComponentTuple extends SubComponentDoc[],
  TMainComponent extends MainComponentDoc = {},
  TName extends string = "",
  TPage extends `/${string}` = "/",
> =
  & IfExtends<
    TMainComponent["isPage"],
    true,
    { path: TPage },
    { name: TName & IfExtends<TName, "", () => "⚠️组件名不可为空⚠️", unknown> }
  >
  & {
    mainComponent: TMainComponent;
    subComponents?: [...TSubComponentTuple];
  };

interface Constructor {
  <
    TSubComponentTuple extends SubComponentDoc[],
    TMainComponent extends MainComponentDoc = {},
    TName extends string = "",
    TPage extends `/${string}` = "/",
  >(
    options: Options<TSubComponentTuple, TMainComponent, TName, TPage>,
  ): CreateDoc<
    TMainComponent,
    TSubComponentTuple,
    TName,
    TPage
  >;
}

export const DefineComponent: Constructor = function(options): any {
  options;
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

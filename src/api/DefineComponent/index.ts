// import type { MainComponentDoc } from "../MainComponent/GetMainComponentDoc/MainComponentDoc";

// type Options<
//   TMainComponent extends MainComponentDoc,
//   TSubComponentTuple extends ISubComponentDoc[],
//   TName extends string = "",
//   TPage extends `/${string}` = "/",
// > =
//   & IfExtends<
//     TMainComponent["isPage"],
//     true,
//     { path: TPage },
//     { name: TName & IfExtends<TName, "", () => "⚠️组件名不可为空⚠️", unknown> }
//   >
//   & {
//     mainComponent?: TMainComponent;
//     subComponents?: TSubComponentTuple;
//   };

// interface Constructor {
//   <
//     TSubComponentTuple extends [...SubComponentList],
//     TMainComponent extends MainComponentDoc = {},
//     SubComponentList extends ISubComponentDoc[] = ISubComponentDoc[],
//     // 无默认值会在无subComponents字段时Literal的类型为ISubComponentDoc[]导致TSubComponentTuple的类型为无线元组,最终报错--类型实例化过深，且可能无限。也不可以为[]
//     TName extends string = "",
//     TPage extends `/${string}` = "/",
//   >(
//     options: Options<TMainComponent, TSubComponentTuple, TName, TPage>,
//   ): void;
// }

// export const DefineComponent: Constructor = function(options): any {
//   // fieldsHandle(options, [
//   //   mainComponentHandle,
//   //   mergeInjectOption,
//   //   deleteNameFiled,
//   //   initInherit,
//   //   customEventsHandle,
//   //   eventsHandle,
//   //   pageLifetimesHandle,
//   //   transformSubComponentsToBehaviors,
//   //   addBehaviors([BinitResponseData, BAddIsSetDataToIns, BComputedAndWatch, beforeCreateAndAttach]),
//   // ]);

//   // attachedHijack(options as any, [createResponseData, isPageCheck, collectCompLifetime_load, collectInherit]);
//   // detachedHijack(options as any, [destroyResponsive]);
//   // compLoadHijack(options as any, [compInheritCacheHandle]);
//   // pageOnLoadHijack(options as any, [PageReceivedDataHandle, pageInheritCacheHandle], [triggerCompLoad]);
//   // return Component(options as any);
// };

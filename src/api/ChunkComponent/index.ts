import type { IfExtends } from "hry-types/src/Any/_api";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { IInjectAllData, IInjectMethods, IInjectStore } from "../InstanceInject/instanceConfig";
import type { GetComputedDoc } from "../RootComponent/Computed/GetComputedDoc";
import type { RootComponentInstance } from "../RootComponent/Instance/RootComponentInstance";
import type { LifetimesOption } from "../RootComponent/Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { ObserversOption } from "../RootComponent/Observers/ObserversOption";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { RootComponentDefinition } from "../RootComponent/returnType";
import type { GetStoreDoc } from "../RootComponent/Store/GeTStoreDoc";
import type { WatchOption } from "../RootComponent/Watch/WatchOption";
import type { ChunkComputedConstraint } from "./ChunkComputed/ChunkComputedConstraint";
import type { ChunkComputedOption } from "./ChunkComputed/ChunkComputedOption";
import type { ChunkDataOption } from "./ChunkData/chunkDataOption";
import type { ChunkEventsConstraint } from "./ChunklEvents/ChunkEventsConstraint";
import type { ChunkEventsOption } from "./ChunklEvents/ChunkEventsOption";
import type { ChunkMethodsOption } from "./ChunkMethods/ChunkMethodsOption";
import type { ChunkStoreConstraint } from "./ChunkStore/ChunkStoreConstraint";
import type { ChunkStoreOption } from "./ChunkStore/ChunkStoreOption";
type ChunkComponentOptions<
  TIsPage extends boolean,
  Prefix extends string,
  RootDatas extends object,
  TEvents extends ChunkEventsConstraint,
  TData extends object,
  TStore extends ChunkStoreConstraint,
  StoreDoc extends object,
  TComputed extends ChunkComputedConstraint,
  ComputedDoc extends object,
  RootMethods extends object,
  RootEvents extends object,
  TMethods extends MethodsConstraint,
  EventsDoc extends object,
  PropertiesDoc extends object,
> =

  // // CustomEventsDoc extends object,
  & ChunkDataOption<TData, keyof (RootDatas & IInjectAllData), Prefix>
  & ChunkStoreOption<TStore, keyof (TData & RootDatas & IInjectAllData), Prefix>
  & ChunkComputedOption<
    TComputed,
    keyof (TData & StoreDoc & RootDatas & IInjectAllData),
    // { data: ComputeObject<TData & StoreDoc & RootDatas & ComputedDoc & IInjectAllData> },
    Prefix
  >
  & ChunkEventsOption<
    TEvents,
    keyof (RootMethods & RootEvents & IInjectMethods),
    Prefix
  >
  & ChunkMethodsOption<
    TMethods,
    keyof (RootMethods & RootEvents & EventsDoc & IInjectMethods),
    Prefix
  >
  & ThisType<
    RootComponentInstance<
      TIsPage,
      TMethods & RootMethods,
      TData,
      TData & StoreDoc & ComputedDoc & RootDatas & IInjectAllData,
      {},
      StoreDoc
    >
  >
  & PageLifetimesOption<TIsPage, PropertiesDoc>
  & LifetimesOption
  & WatchOption<
    & ComputedDoc
    & Required<RootDatas>
    & TData
    & StoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "observers">>
  & ObserversOption<
    & ComputedDoc
    & Required<RootDatas>
    & TData
    & StoreDoc
    & IInjectStore
  >;

type ChunkComponentConstructor<
  TRootComponentReturnType extends RootComponentDefinition,
  TPrefix extends string,
  IsPage extends boolean = TRootComponentReturnType["isPage"] extends true ? true : false,
  RootDatas extends object =
    & Required<TRootComponentReturnType["properties"]>
    & TRootComponentReturnType["data"]
    & TRootComponentReturnType["computed"]
    & TRootComponentReturnType["store"],
  RootMethods extends object = TRootComponentReturnType["methods"] & {},
  RootEvents extends object = TRootComponentReturnType["events"] & {},
> = <
  TEvents extends ChunkEventsConstraint,
  TStore extends ChunkStoreConstraint<Required<TRootComponentReturnType["properties"]>>,
  TMethods extends MethodsConstraint = {},
  TData extends object = {},
  StoreDoc extends object = ChunkStoreConstraint<Required<TRootComponentReturnType["properties"]>> extends TStore ? {}
    : GetStoreDoc<TStore>,
  TComputed extends ChunkComputedConstraint = {},
  ComputedDoc extends object = GetComputedDoc<TComputed>,
  EventsDoc extends object = IfExtends<ChunkEventsConstraint, TEvents, {}, TEvents>,
  PropertiesDoc extends object = NonNullable<TRootComponentReturnType["properties"]>,
>(
  options: ChunkComponentOptions<
    IsPage,
    TPrefix,
    RootDatas,
    TEvents,
    TData,
    TStore,
    StoreDoc,
    TComputed,
    ComputedDoc,
    RootMethods,
    RootEvents,
    TMethods,
    EventsDoc,
    PropertiesDoc
  >,
) => never;

/**
 * ChunkComponent API
 * @description 它是用来配置wxml中非自定义组件元素数据和逻辑的API。在不想把wxml中某个元素提取为单独的自定义组件时,可以使用它来把某个元素的相关数据和逻辑配置在一起,以达到和自定义组件相同的效果。
 * @example
 * ```wxml
 *  <view>
 *    <customA ... / >
 *    ...
 *    <view id="chunkA" >
 *       <text>{{chunkA_num}}</text>
 *       <view bind:tap="chunkA_tap"/>
 *        ...
 *    </view>
 * </view>
 * ```
 * ```ts
 * const chunkA = ChunkComponent<Root, "chunkA">()({
 *   data: {chunkA_num: "123",...},
 *   events: {chunkA_tap(e){e.detail},...},// e.detail 类型为string
 * });
 * const customA = CustomComponent<Root, CustomA>()({
 *   ...
 * });
 * DefinedComponent({
 *  ...
 *  subComponents: [chunkA, customA],
 * })
 * ```
 * @param options - ChunkComponent的选项配置,包括数据、方法、事件等,具体配置项和类型可以参考ChunkComponentOptions类型定义。
 * @returns never
 */
export function ChunkComponent<
  TRootComponentReturnType extends RootComponentDefinition,
  TPrefix extends string = "",
>(): ChunkComponentConstructor<
  TRootComponentReturnType,
  TPrefix
> {
  return (options) => options as never;
}

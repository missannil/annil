import type { IfAllExtends } from "hry-types";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { IInjectAllData, IInjectMethods, IInjectStore } from "../InstanceInject/instanceConfig";
import type { GetComputedDef } from "../RootComponent/Computed/GetComputedDef";
import type { GenerateCustomEventMethods } from "../RootComponent/Instance/CustomEventMethods";
import type { RootComponentInstance } from "../RootComponent/Instance/RootComponentInstance";
import type { LifetimesOption } from "../RootComponent/Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { ObserversOption } from "../RootComponent/Observers/ObserversOption";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { RootComponentDefinition } from "../RootComponent/returnType";
import type { GetStoreDef } from "../RootComponent/Store/GetStoreDef";
import type { WatchOption } from "../RootComponent/Watch/WatchOption";
import type { ChunkComputedConstraint } from "./ChunkComputed/ChunkComputedConstraint";
import type { ChunkComputedOption } from "./ChunkComputed/ChunkComputedOption";
import type { ChunkDataOption } from "./ChunkData/chunkDataOption";
import type { ChunkEventsConstraint } from "./ChunkEvents/ChunkEventsConstraint";
import type { ChunkEventsOption } from "./ChunkEvents/ChunkEventsOption";
import type { ChunkMethodsOption } from "./ChunkMethods/ChunkMethodsOption";
import type { ChunkStoreConstraint } from "./ChunkStore/ChunkStoreConstraint";
import type { ChunkStoreOption } from "./ChunkStore/ChunkStoreOption";

type ChunkComponentOptions<
  TIsPage extends boolean,
  Prefix extends string,
  RootDataDoc extends object,
  TEvents extends ChunkEventsConstraint,
  TData extends object,
  TStore extends ChunkStoreConstraint,
  ChunkStoreDoc extends object,
  TComputed extends ChunkComputedConstraint,
  ChunkComputedDoc extends object,
  RootMethods extends object,
  RootEvents extends object,
  TMethods extends MethodsConstraint,
  ChunkEventsDoc extends object,
  RootPropertiesDoc extends object,
  RootCustomEventsDoc extends object,
> =
  & ChunkDataOption<TData, keyof (RootDataDoc & IInjectAllData), Prefix>
  & ChunkStoreOption<TStore, keyof (TData & RootDataDoc & IInjectAllData), Prefix>
  & ChunkComputedOption<
    TComputed,
    keyof (TData & ChunkStoreDoc & RootDataDoc & IInjectAllData),
    Prefix
  >
  & ChunkEventsOption<
    TEvents,
    keyof (RootMethods & RootEvents & IInjectMethods & RootCustomEventsDoc),
    Prefix
  >
  & ChunkMethodsOption<
    TMethods,
    keyof (RootMethods & RootEvents & ChunkEventsDoc & IInjectMethods),
    Prefix
  >
  & ThisType<
    RootComponentInstance<
      TIsPage,
      TMethods & RootMethods & GenerateCustomEventMethods<RootCustomEventsDoc>,
      TData,
      TData & ChunkStoreDoc & ChunkComputedDoc & RootDataDoc & IInjectAllData,
      {},
      ChunkStoreDoc
    >
  >
  & PageLifetimesOption<TIsPage, RootPropertiesDoc>
  & LifetimesOption
  & WatchOption<
    & ChunkComputedDoc
    & Required<RootDataDoc>
    & TData
    & ChunkStoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "observers">>
  & ObserversOption<
    & ChunkComputedDoc
    & Required<RootDataDoc>
    & TData
    & ChunkStoreDoc
    & IInjectStore
  >;

type ChunkComponentConstructor<
  TRootDoc extends RootComponentDefinition,
  Prefix extends string,
  IsPage extends boolean = TRootDoc["isPage"] extends true ? true : false,
  RootDataDoc extends object =
    & Required<TRootDoc["properties"]>
    & TRootDoc["data"]
    & TRootDoc["computed"]
    & TRootDoc["store"],
  RootMethods extends object = TRootDoc["methods"] & {},
  RootEvents extends object = TRootDoc["events"] & {},
  RootCustomEventsDoc extends object = TRootDoc["customEvents"] & {},
> = <
  TEvents extends ChunkEventsConstraint,
  TStore extends ChunkStoreConstraint<Required<TRootDoc["properties"]>>,
  TMethods extends MethodsConstraint = {},
  TData extends object = {},
  ChunkStoreDoc extends object = ChunkStoreConstraint<Required<TRootDoc["properties"]>> extends TStore ? {}
    : GetStoreDef<TStore>,
  TComputed extends ChunkComputedConstraint = {},
  ChunkComputedDoc extends object = GetComputedDef<TComputed>,
  ChunkEventsDoc extends object = IfAllExtends<ChunkEventsConstraint, TEvents, {}, TEvents>,
  RootPropertiesDoc extends object = NonNullable<TRootDoc["properties"]>,
>(
  options: ChunkComponentOptions<
    IsPage,
    Prefix,
    RootDataDoc,
    TEvents,
    TData,
    TStore,
    ChunkStoreDoc,
    TComputed,
    ChunkComputedDoc,
    RootMethods,
    RootEvents,
    TMethods,
    ChunkEventsDoc,
    RootPropertiesDoc,
    RootCustomEventsDoc
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
 * DefineComponent({
 *  ...
 *  subComponents: [chunkA, customA],
 * })
 * ```
 * @param options - ChunkComponent的选项配置,包括数据、方法、事件等,具体配置项和类型可以参考ChunkComponentOptions类型定义。
 * @returns never
 */
export function ChunkComponent<
  TRootDoc extends RootComponentDefinition,
  Prefix extends string = "",
>(): ChunkComponentConstructor<
  TRootDoc,
  Prefix
> {
  return (options) => options as never;
}

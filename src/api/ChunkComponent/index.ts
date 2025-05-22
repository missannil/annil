import type { IfExtends } from "hry-types/src/Any/_api";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { IInjectAllData, IInjectMethods, IInjectStore } from "../InstanceInject/instanceConfig";
import type { GetComputedDoc } from "../RootComponent/Computed/GetComputedDoc";
import type { RootComponentInstance } from "../RootComponent/Instance/RootComponentInstance";
import type { LifetimesOption } from "../RootComponent/Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { ObserversOption } from "../RootComponent/Observers/ObserversOption";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { RootComponentType } from "../RootComponent/RootComponentType";
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
  RootDoc extends RootComponentType,
  Prefix extends string,
  IsPage extends boolean = RootDoc["isPage"] extends true ? true : false,
  RootDatas extends object =
    & Required<RootDoc["properties"]>
    & RootDoc["data"]
    & RootDoc["computed"]
    & RootDoc["store"],
  RootMethods extends object = RootDoc["methods"] & {},
  RootEvents extends object = RootDoc["events"] & {},
> = <
  TEvents extends ChunkEventsConstraint,
  TStore extends ChunkStoreConstraint<Required<RootDoc["properties"]>>,
  TMethods extends MethodsConstraint = {},
  TData extends object = {},
  StoreDoc extends object = ChunkStoreConstraint<Required<RootDoc["properties"]>> extends TStore ? {}
    : GetStoreDoc<TStore>,
  TComputed extends ChunkComputedConstraint = {},
  ComputedDoc extends object = GetComputedDoc<TComputed>,
  EventsDoc extends object = IfExtends<ChunkEventsConstraint, TEvents, {}, TEvents>,
  PropertiesDoc extends object = RootDoc["properties"] & {},
>(
  options: ChunkComponentOptions<
    IsPage,
    Prefix,
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

export function ChunkComponent<
  RootDoc extends RootComponentType,
  Prefix extends string = "",
>(): ChunkComponentConstructor<
  RootDoc,
  Prefix
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (options: any) => options as never;
}

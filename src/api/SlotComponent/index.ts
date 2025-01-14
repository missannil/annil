import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Func } from "hry-types/src/Misc/Func";
import type { ComputeObject } from "../../types/ComputeObj";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { IInjectAllData, IInjectMethods, IInjectStore } from "../InstanceInject/instanceConfig";
import type { ComputedConstraint } from "../RootComponent/Computed/ComputedConstraint";
import type { RootComponentInstance } from "../RootComponent/Instance/RootComponentInstance";
import type { LifetimesOption } from "../RootComponent/Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { ObserversOption } from "../RootComponent/Observers/ObserversOption";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { RootComponentType } from "../RootComponent/RootComponentType";
import type { GetStoreDoc } from "../RootComponent/Store/GeTStoreDoc";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";
import type { WatchOption } from "../RootComponent/Watch/WatchOption";
import type { SubComponentType } from "../SubComponent/SubComponentType";
import type { GetSlotComputedDoc } from "./SlotComputed/GetSlotComputedDoc";
import type { SlotComputedOption } from "./SlotComputed/SlotComputedOption";
import type { SlotDataOption } from "./SlotData/SlotDataOption";
import type { SlotEventsConstraint } from "./SlotEvents/SlotEventsConstraint";
import type { SlotEventsOption } from "./SlotEvents/SlotEventsOption";
import type { SlotMethodsOption } from "./SlotMethods/SlotMethodsOption";
import type { SoltStoreOption } from "./SlotStore/SlotStoreOption";
import type { SLotSuperDataOption } from "./SLotSuperDatas/SlotSuperDatasOption";
type SoltComponentOptions<
  Prefix extends string,
  TSuperData extends PropertyKey[],
  TEvents extends SlotEventsConstraint,
  TIsPage extends boolean,
  TMethods extends MethodsConstraint,
  TData extends object,
  TStore extends StoreConstraint,
  TComputed extends Record<string, Func>,
  EventsDoc extends object,
  // CustomEventsDoc extends object,
  PropertiesDoc extends object,
  DataDoc extends object,
  StoreDoc extends object,
  ComputedDoc extends object,
  AllSuperDatas extends object,
  AllSuperMethods extends object,
  AllSuperEvents extends object,
> =
  & SLotSuperDataOption<TSuperData>
  & SlotDataOption<TData, keyof (AllSuperDatas & IInjectAllData), `${Prefix}_${string}` | `_${Prefix}_${string}`>
  & SoltStoreOption<TStore, keyof (TData & AllSuperDatas & IInjectAllData), Prefix>
  & SlotComputedOption<
    TComputed,
    keyof (TData & StoreDoc & AllSuperDatas & IInjectAllData),
    { data: ComputeObject<TData & StoreDoc & AllSuperDatas & ComputedDoc & IInjectAllData> },
    Prefix
  >
  & SlotEventsOption<
    TEvents,
    keyof (AllSuperMethods & AllSuperEvents & IInjectMethods),
    `${Prefix}_${string}`
  >
  & SlotMethodsOption<
    TMethods,
    keyof (AllSuperMethods & AllSuperEvents & EventsDoc & IInjectMethods),
    `${Prefix}_${string}`
  >
  & PageLifetimesOption<TIsPage, PropertiesDoc>
  & LifetimesOption
  & WatchOption<
    & ComputedDoc
    & Required<AllSuperDatas>
    & DataDoc
    & StoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "observers">>
  & ObserversOption<
    & ComputedDoc
    & Required<AllSuperDatas>
    & DataDoc
    & StoreDoc
    & IInjectStore
  >
  & ThisType<
    RootComponentInstance<
      TIsPage,
      TMethods & AllSuperMethods,
      DataDoc,
      DataDoc & StoreDoc & ComputedDoc & AllSuperDatas & IInjectAllData,
      {},
      StoreDoc
    >
  >;

type SlotComponentConstructor<
  RootDoc extends RootComponentType,
  SubDoc extends SubComponentType,
  Prefix extends string,
  IsPage extends boolean = RootDoc["isPage"] extends true ? true : false,
  AllSuperDatas extends object =
    & Required<RootDoc["properties"]>
    & RootDoc["data"]
    & RootDoc["computed"]
    & RootDoc["store"]
    & SubDoc["allDatas"],
  AllSuperMethods extends object = RootDoc["methods"] & SubDoc["methods"] & {},
  AllSuperEvents extends object = RootDoc["events"] & SubDoc["methods"] & SubDoc["events"] & {},
> = <
  // SlotDataOption
  TSuperData extends (keyof AllSuperDatas)[],
  // TEvents 不能有默认值 {} 会引起事件参数类型(e)失效
  TEvents extends SlotEventsConstraint,
  TData extends object = {},
  TStore extends StoreConstraint = {},
  TComputed extends ComputedConstraint = {},
  // TCustomEvents extends IfExtends<IsPage, false, CustomEventConstraint, EmptyObject> = {},
  TMethods extends MethodsConstraint = {},
  DataDoc extends object = TData,
  EventsDoc extends object = IfExtends<SlotEventsConstraint, TEvents, {}, TEvents>,
  // CustomEventsDoc extends object = GetCustomEventDoc<TCustomEvents>,
  PropertiesDoc extends object = RootDoc["properties"] & {},
  StoreDoc extends object = GetStoreDoc<TStore>,
  ComputedDoc extends object = GetSlotComputedDoc<TComputed>,
>(
  options: SoltComponentOptions<
    Prefix,
    TSuperData,
    TEvents,
    IsPage,
    // TCustomEvents,
    TMethods,
    TData,
    TStore,
    TComputed,
    // TObservers,
    EventsDoc,
    // CustomEventsDoc,
    PropertiesDoc,
    DataDoc,
    StoreDoc,
    ComputedDoc,
    AllSuperDatas,
    AllSuperMethods,
    AllSuperEvents
  >,
) => never;

export function SlotComponent<
  RootDoc extends RootComponentType,
  SubDoc extends SubComponentType,
  name extends string,
>(): SlotComponentConstructor<
  RootDoc,
  SubDoc,
  name
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (options: any) => options as never;
}

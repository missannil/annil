import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { Func } from "hry-types/src/Misc/Func";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { ComputeObject } from "../../types/ComputeObj";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { RemoveNullOfRequired } from "../../types/RemoveNullOfRequired";
import type { ComponentType } from "../DefineComponent/ReturnType/ComponentType";
import type { IInjectStore } from "../InstanceInject/instanceConfig";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { ComputedOption } from "./Computed/ComputedOption";
import type { GetComputedDoc } from "./Computed/GetComputedDoc";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
import type { CustomEventsOption } from "./CustomEvents/CustomEventsOption";
import type { GetCustomEventDoc } from "./CustomEvents/GetCustomEventDoc";
import type { DataConstraint } from "./Data/DataConstraint";
import type { DataOption } from "./Data/DataOption";
import type { EventsConstraint } from "./Events/EventsConstraint";
import type { EventsOption } from "./Events/EventsOption";
import type { RootComponentInstance } from "./Instance/RootComponentInstance";
import type { IsPageOption } from "./IsPage/IsPageOption";
import type { LifetimesConstraint } from "./Lifetimes/LifetimesConstraint";
import type { LifetimesOption } from "./Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "./Methods/MethodsConstraint";
import type { MethodsOption } from "./Methods/MethodsOption";
import type { ObserversOption } from "./Observers/ObserversOption";
import type { PageLifetimesOption } from "./PageLifetimes/PageLifetimesOption";
import type { GetPropertiesDoc } from "./Properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "./Properties/PropertiesConstraint";
import type { PropertiesOption } from "./Properties/PropertiesOption";
import type { GetStoreDoc } from "./Store/GeTStoreDoc";
import type { StoreConstraint } from "./Store/StoreConstraint";
import type { StoreOption } from "./Store/StoreOption";
import type { WatchOption } from "./Watch/WatchOption";

type RootComponentOptions<
  TEvents extends object,
  TIsPage extends boolean,
  TCustomEvents extends CustomEventConstraint,
  TMethods extends MethodsConstraint,
  TProperties extends PropertiesConstraint,
  TData extends object,
  TStore extends StoreConstraint,
  TComputed extends Record<string, Func>,
  EventsDoc extends object,
  CustomEventsDoc extends object,
  PropertiesDoc extends object,
  DataDoc extends object,
  StoreDoc extends object,
  ComputedDoc extends object,
> =
  & MethodsOption<TMethods, keyof (EventsDoc & CustomEventsDoc)>
  & PropertiesOption<TProperties>
  & IsPageOption<TIsPage>
  & EventsOption<TEvents>
  & CustomEventsOption<TCustomEvents, keyof EventsDoc>
  & DataOption<TData, keyof PropertiesDoc>
  & StoreOption<TStore, keyof (PropertiesDoc & DataDoc)>
  & ComputedOption<
    TComputed,
    keyof (PropertiesDoc & DataDoc & StoreDoc)
  > // { data: ComputeObject<DataDoc & Required<PropertiesDoc> & StoreDoc & ComputedDoc & IInjectAllData> }
  & PageLifetimesOption<TIsPage, PropertiesDoc>
  & LifetimesOption
  & WatchOption<
    & ComputedDoc
    & Required<PropertiesDoc>
    & DataDoc
    & StoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "observers">>
  & ObserversOption<
    & ComputedDoc
    & Required<PropertiesDoc>
    & DataDoc
    & StoreDoc
    & IInjectStore
  >
  & ThisType<
    RootComponentInstance<
      TIsPage,
      TMethods,
      DataDoc,
      DataDoc & Required<PropertiesDoc> & StoreDoc & ComputedDoc,
      CustomEventsDoc,
      StoreDoc
    >
  >;

type RootComponentConstructor<TComponentDocList extends ComponentType[]> = <
  TEvents extends EventsConstraint<TComponentDocList>,
  TStore extends StoreConstraint<PropertiesDoc>,
  TIsPage extends boolean = false,
  const TProperties extends PropertiesConstraint = {},
  TData extends object = {},
  TComputed extends ComputedConstraint = {},
  // 页面时自定义事件无意义
  TCustomEvents extends IfExtends<TIsPage, false, CustomEventConstraint, EmptyObject> = {},
  TMethods extends MethodsConstraint = {},
  EventsDoc extends object = IfExtends<EventsConstraint<TComponentDocList>, TEvents, {}, TEvents>,
  CustomEventsDoc extends object = GetCustomEventDoc<TCustomEvents>,
  PropertiesDoc extends object = GetPropertiesDoc<TProperties>,
  DataDoc extends object = TData,
  StoreDoc extends object = StoreConstraint<PropertiesDoc> extends TStore ? {} : GetStoreDoc<TStore>,
  ComputedDoc extends object = GetComputedDoc<TComputed>,
>(
  options: RootComponentOptions<
    TEvents,
    TIsPage,
    TCustomEvents,
    TMethods,
    TProperties,
    TData,
    TStore,
    TComputed,
    // TObservers,
    EventsDoc,
    CustomEventsDoc,
    PropertiesDoc,
    DataDoc,
    StoreDoc,
    ComputedDoc
  >,
) => // 返回类型 satisfies RootComponentDoc
ComputeIntersection<
  & IfExtends<TIsPage, false, {}, { isPage: true }>
  & IfExtends<
    EmptyObject,
    PropertiesDoc,
    {},
    { properties: IfExtends<false, TIsPage, PropertiesDoc, RemoveNullOfRequired<PropertiesDoc>> }
  >
  & IfExtends<EmptyObject, DataDoc, {}, { data: DataDoc }>
  & IfExtends<EmptyObject, StoreDoc, {}, { store: ComputeObject<StoreDoc> }>
  & IfExtends<EmptyObject, ComputedDoc, {}, { computed: ComputedDoc }>
  & IfExtends<EmptyObject, TMethods, {}, { methods: TMethods }>
  & IfExtends<EmptyObject, EventsDoc, {}, { events: EventsDoc }>
  & IfExtends<EmptyObject, CustomEventsDoc, {}, { customEvents: ComputeObject<CustomEventsDoc> }>
>;

export function RootComponent<
  // TComponentDocList泛型为了给events字段提供类型约束
  TComponentDocList extends ComponentType[] = [],
>(): RootComponentConstructor<
  TComponentDocList
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (options: any) => options;
}

export type RootComponentTrueOptions = {
  isPage?: boolean;
  properties?: PropertiesConstraint;
  data?: DataConstraint;
  computed?: ComputedConstraint;
  customEvents?: CustomEventConstraint;
  observers?: Record<string, Func>;
  methods?: MethodsConstraint;
  behaviors?: string[];
  events?: EventsConstraint;
  store?: StoreConstraint;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?:
    | PageLifetimesOption<false, object>["pageLifetimes"]
    | PageLifetimesOption<true, object>["pageLifetimes"];
};

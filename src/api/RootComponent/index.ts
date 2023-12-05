import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { NoInfer } from "hry-types/src/Generic/NoInfer";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { Func } from "hry-types/src/Misc/Func";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { ComputeObject } from "../../types/ComputeObj";
import type { WMCompOtherOption, WMCompPageLifetimes, WMPageLifetimes } from "../../types/OfficialTypeAlias";
import type { ComponentDoc } from "../DefineComponent/ReturnType/ComponentDoc";
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
  & ComputedOption<TComputed, keyof (PropertiesDoc & DataDoc & StoreDoc)>
  & PageLifetimesOption<TIsPage, NoInfer<PropertiesDoc>>
  & LifetimesOption<TIsPage>
  & WatchOption<
    & ComputedDoc
    & Required<PropertiesDoc>
    & DataDoc
    & StoreDoc
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes">>
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

type RootComponentConstructor<TComponentDocList extends ComponentDoc[]> = {
  <
    // TEvents 不能有默认值 {} 会引起事件参数类型(e)失效
    TEvents extends EventsConstraint<TComponentDocList>,
    TIsPage extends boolean = false,
    const TProperties extends PropertiesConstraint = {},
    TData extends object = {},
    TStore extends StoreConstraint = {},
    TComputed extends ComputedConstraint = {},
    // 页面时自定义事件无意义
    TCustomEvents extends IfExtends<TIsPage, false, CustomEventConstraint, EmptyObject> = {},
    TMethods extends MethodsConstraint = {},
    EventsDoc extends object = IfExtends<EventsConstraint<TComponentDocList>, TEvents, {}, TEvents>,
    CustomEventsDoc extends object = GetCustomEventDoc<TCustomEvents>,
    PropertiesDoc extends object = GetPropertiesDoc<TProperties, TIsPage>,
    DataDoc extends object = TData,
    StoreDoc extends object = GetStoreDoc<TStore>,
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
      EventsDoc,
      CustomEventsDoc,
      PropertiesDoc,
      DataDoc,
      StoreDoc,
      ComputedDoc
    >,
  ): // 返回类型 satisfies RootComponentDoc
  ComputeIntersection<
    & IfExtends<TIsPage, false, {}, { isPage: true }>
    & IfExtends<EmptyObject, PropertiesDoc, {}, { properties: PropertiesDoc }>
    & IfExtends<EmptyObject, DataDoc, {}, { data: DataDoc }>
    & IfExtends<EmptyObject, StoreDoc, {}, { store: ComputeObject<StoreDoc> }>
    & IfExtends<EmptyObject, ComputedDoc, {}, { computed: ComputedDoc }>
    & IfExtends<EmptyObject, TMethods, {}, { methods: TMethods }>
    & IfExtends<EmptyObject, EventsDoc, {}, { events: EventsDoc }>
    & IfExtends<EmptyObject, CustomEventsDoc, {}, { customEvents: ComputeObject<CustomEventsDoc> }>
  >;
};

export function RootComponent<
  // TComponentDocList泛型为了给events字段提供类型约束
  TComponentDocList extends ComponentDoc[] = [],
>(): RootComponentConstructor<
  TComponentDocList
> {
  return ((options: any) => options as RootComponentTrueOptions) as any;
}

export type RootComponentTrueOptions = {
  isPage?: boolean;
  properties?: PropertiesConstraint;
  data?: DataConstraint;
  computed?: ComputedConstraint;
  customEvents?: CustomEventConstraint;
  methods?: MethodsConstraint;
  events?: EventsConstraint;
  store?: StoreConstraint;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: Func } & WMPageLifetimes>;
};

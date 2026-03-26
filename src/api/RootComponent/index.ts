import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { Func } from "hry-types/src/Misc/Func";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { ComputeObject } from "../../types/ComputeObject";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { RemoveNullOfRequired } from "../../types/RemoveNullOfRequired";
import type { ComponentDoc } from "../DefineComponent/returnType/ComponentDoc";
import type { IInjectStore } from "../InstanceInject/instanceConfig";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { ComputedOption } from "./Computed/ComputedOption";
import type { GetComputedDef } from "./Computed/GetComputedDef";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
import type { CustomEventsOption } from "./CustomEvents/CustomEventsOption";
import type { GetCustomEventsDef } from "./CustomEvents/GetCustomEventDef";
import type { DataOption } from "./Data/DataOption";
import type { EventsConstraint } from "./Events/EventsConstraint";
import type { EventsOption } from "./Events/EventsOption";
import type { RootComponentInstance } from "./Instance/RootComponentInstance";
import type { IsPageOption } from "./IsPage/IsPageOption";
import type { LifetimesOption } from "./Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "./Methods/MethodsConstraint";
import type { MethodsOption } from "./Methods/MethodsOption";
import type { ObserversOption } from "./Observers/ObserversOption";
import type { PageLifetimesOption } from "./PageLifetimes/PageLifetimesOption";
import type { GetPropertiesDef } from "./Properties/GetPropertiesDef";
import type { PropertiesConstraint } from "./Properties/PropertiesConstraint";
import type { PropertiesOption } from "./Properties/PropertiesOption";
import type { GetStoreDef } from "./Store/GetStoreDef";
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
  EventsDef extends object,
  CustomEventsDef extends object,
  PropertiesDef extends object,
  DataDef extends object,
  StoreDef extends object,
  ComputedDef extends object,
> =
  & MethodsOption<TMethods, keyof (EventsDef & CustomEventsDef)>
  & PropertiesOption<TProperties>
  & IsPageOption<TIsPage>
  & EventsOption<TEvents>
  & IfExtends<TIsPage, false, CustomEventsOption<TCustomEvents, keyof EventsDef>, {}>
  & DataOption<TData, keyof PropertiesDef>
  & StoreOption<TStore, keyof (PropertiesDef & DataDef)>
  & ComputedOption<
    TComputed,
    keyof (PropertiesDef & DataDef & StoreDef)
  > // { data: ComputeObject<DataDef & Required<PropertiesDef> & StoreDef & ComputedDef & IInjectAllData> }
  & PageLifetimesOption<TIsPage, PropertiesDef>
  & LifetimesOption
  & WatchOption<
    & ComputedDef
    & Required<PropertiesDef>
    & DataDef
    & StoreDef
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "observers">>
  & ObserversOption<
    & ComputedDef
    & Required<PropertiesDef>
    & DataDef
    & StoreDef
    & IInjectStore
  >
  & ThisType<
    RootComponentInstance<
      TIsPage,
      TMethods,
      DataDef,
      DataDef & Required<PropertiesDef> & StoreDef & ComputedDef,
      CustomEventsDef,
      StoreDef
    >
  >;

type RootComponentConstructor<TComponentDocList extends ComponentDoc[]> = <
  TEvents extends EventsConstraint<TComponentDocList>,
  TStore extends StoreConstraint<PropertiesDef>,
  TIsPage extends boolean = false,
  const TProperties extends PropertiesConstraint = {},
  TData extends object = {},
  TComputed extends ComputedConstraint = {},
  // 页面时自定义事件无意义
  TCustomEvents extends IfExtends<TIsPage, false, CustomEventConstraint, EmptyObject> = {},
  TMethods extends MethodsConstraint = {},
  EventsDef extends object = IfExtends<EventsConstraint<TComponentDocList>, TEvents, {}, TEvents>,
  CustomEventsDef extends object = GetCustomEventsDef<TCustomEvents>,
  PropertiesDef extends object = GetPropertiesDef<TProperties>,
  DataDef extends object = TData,
  StoreDef extends object = StoreConstraint<PropertiesDef> extends TStore ? {} : GetStoreDef<TStore>,
  ComputedDef extends object = GetComputedDef<TComputed>,
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
    EventsDef,
    CustomEventsDef,
    PropertiesDef,
    DataDef,
    StoreDef,
    ComputedDef
  >,
) => // 生成RootComponentDefinition
ComputeIntersection<
  & IfExtends<TIsPage, false, {}, { isPage: true }>
  & IfExtends<
    EmptyObject,
    PropertiesDef,
    {},
    { properties: IfExtends<false, TIsPage, PropertiesDef, RemoveNullOfRequired<PropertiesDef>> }
  >
  & IfExtends<EmptyObject, DataDef, {}, { data: DataDef }>
  & IfExtends<EmptyObject, StoreDef, {}, { store: ComputeObject<StoreDef> }>
  & IfExtends<EmptyObject, ComputedDef, {}, { computed: ComputedDef }>
  & IfExtends<EmptyObject, TMethods, {}, { methods: TMethods }>
  & IfExtends<EmptyObject, EventsDef, {}, { events: EventsDef }>
  & IfExtends<EmptyObject, CustomEventsDef, {}, { customEvents: ComputeObject<CustomEventsDef> }>
>;
/**
 * RootComponent API
 * @returns RootComponentDefinition
 */
export function RootComponent<
  // TComponentDocList泛型为了给events字段提供类型约束
  TComponentDocList extends ComponentDoc[] = [],
>(): RootComponentConstructor<
  TComponentDocList
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (options: any) => options;
}

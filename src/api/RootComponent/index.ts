import type { _SimplifyIntersection, EmptyObject, Func } from "hry-types";
import type { IfExtends } from "../../types/IfExtends";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { Simplify } from "../../types/Simplify";
import type { ComponentDoc } from "../DefineComponent/returnType/ComponentDoc";
import type { IInjectAllData, IInjectMethods, IInjectStore, InjectData } from "../InstanceInject/instanceConfig";
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
  OwnDataDoc extends object,
  InjectableDataDoc extends object,
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
  >
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
  & { behaviors?: string[] }
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
      TMethods & Omit<IInjectMethods, keyof TMethods>,
      DataDef,
      OwnDataDoc & InjectableDataDoc,
      CustomEventsDef,
      StoreDef
    >
  >;

type RootComponentConstructor<TComponentDocList extends ComponentDoc[]> = <
  TEvents extends EventsConstraint<TComponentDocList>,
  TStore extends StoreConstraint<
    _SimplifyIntersection<Required<PropertiesDef> & DataDef & Omit<InjectData, keyof (PropertiesDef & DataDef)>>
  >,
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
  StoreDef extends object = StoreConstraint<
    _SimplifyIntersection<Required<PropertiesDef> & DataDef & Omit<InjectData, keyof (PropertiesDef & DataDef)>>
  > extends TStore ? {}
    : GetStoreDef<TStore>,
  ComputedDef extends object = GetComputedDef<TComputed>,
  OwnDataDoc extends object = Required<PropertiesDef> & DataDef & StoreDef & ComputedDef,
  InjectableDataDoc extends object = Omit<IInjectAllData, keyof OwnDataDoc>,
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
    EventsDef,
    CustomEventsDef,
    PropertiesDef,
    DataDef,
    StoreDef,
    ComputedDef,
    OwnDataDoc,
    InjectableDataDoc
  >,
) => // 生成RootComponentDefinition
_SimplifyIntersection<
  & IfExtends<TIsPage, false, {}, { isPage: true }>
  & IfExtends<
    EmptyObject,
    PropertiesDef,
    {},
    { properties: IfExtends<false, TIsPage, PropertiesDef, PropertiesDef> }
  >
  & IfExtends<EmptyObject, DataDef, {}, { data: DataDef }>
  & IfExtends<EmptyObject, StoreDef, {}, { store: Simplify<StoreDef> }>
  & IfExtends<EmptyObject, ComputedDef, {}, { computed: ComputedDef }>
  & IfExtends<EmptyObject, TMethods, {}, { methods: TMethods }>
  & IfExtends<EmptyObject, EventsDef, {}, { events: EventsDef }>
  & IfExtends<EmptyObject, CustomEventsDef, {}, { customEvents: Simplify<CustomEventsDef> }>
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

// 全局实例增加 有效的注入数据,store字段参数包含 (prop + data + 有效的注入数据)

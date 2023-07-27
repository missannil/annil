import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/_api";
import type { WMCompLifetimes, WMCompPageLifetimes } from "../../types/officialAlias";
import type { ComponentDoc } from "../DefineComponent/ReturnType/ComponentDoc";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { ComputedOption } from "./Computed/ComputedOption";
import type { GetComputedDoc } from "./Computed/GetComputedDoc";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
import type { CustomEventsOption } from "./CustomEvents/CustomEventsOption";
import type { GetCustomEventDoc } from "./CustomEvents/GetCustomEventDoc";
import type { DataOption } from "./Data/DataOption";
import type { GetDataDoc } from "./Data/GetDataDoc";
import type { EventsConstraint } from "./Events/EventsConstraint";
import type { EventsOption } from "./Events/EventsOption";
import type { RootComponentInstance } from "./Instance/RootComponentInstance";
import type { IsPageOption } from "./IsPage/IsPageOption";
import type { LifetimesOption } from "./Lifetimes/LifetimesOption";
import type { MethodsConstraint } from "./Methods/MethodsConstraint";
import type { MethodsOption } from "./Methods/MethodsOption";
import type { PageLifetimesOption } from "./PageLifetimes/PageLifetimesOption";
import type { GetPropertiesDoc } from "./Properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "./Properties/PropertiesConstraint";
import type { PropertiesOption } from "./Properties/PropertiesOption";
import type { WatchOption } from "./Watch/WatchOption";

export type RootCompOptions = {
  isPage?: true;
  properties?: PropertiesConstraint;
  data?: object;
  computed?: ComputedConstraint;
  customEvents?: CustomEventConstraint;
  events?: EventsConstraint;
  methods?: MethodsConstraint;
  watch?: object;
  lifetimes?: WMCompLifetimes["lifetimes"];
  pageLifetimes?: Partial<WMCompPageLifetimes>;
};

type Options<
  TReceivedComponentDoc extends object,
  TEvents extends object,
  TIsPage extends boolean,
  TCustomEvents extends CustomEventConstraint,
  TMethods extends MethodsConstraint,
  TProperties extends PropertiesConstraint,
  TData extends object,
  TComputed extends Record<string, () => any>,
  EventsDoc,
  CustomEventsDoc extends object,
  PropertiesDoc extends object,
  DataDoc extends object,
  ComputedDoc extends object,
> =
  & MethodsOption<TMethods, keyof (EventsDoc & CustomEventsDoc)>
  & PropertiesOption<TProperties>
  & IsPageOption<TIsPage>
  & CustomEventsOption<TCustomEvents, EventsDoc>
  & EventsOption<TEvents, EventsConstraint<TReceivedComponentDoc>>
  & DataOption<TData, PropertiesDoc>
  & ComputedOption<TComputed, Required<PropertiesDoc> & DataDoc, ComputedDoc>
  & PageLifetimesOption<TIsPage, PropertiesDoc>
  & LifetimesOption<TIsPage>
  & WatchOption<
    & ComputedDoc
    & Required<PropertiesDoc>
    & DataDoc
  >
  & ThisType<RootComponentInstance<TMethods, TData, DataDoc & Required<PropertiesDoc> & ComputedDoc, CustomEventsDoc>>;

type RootComponentConstructor<TReceivedComponentDoc extends ComponentDoc[] | ComponentDoc> = {
  <
    Literal extends
      | string
      | number
      | boolean
      | null
      | Literal[]
      | Record<string, Literal>,
    // TEvents 不能有默认值 {} 会引起事件参数类型(e)失效
    TEvents extends EventsConstraint<TReceivedComponentDoc>,
    TIsPage extends boolean = false,
    TProperties extends PropertiesConstraint<Literal> = {},
    TData extends object = {},
    TComputed extends ComputedConstraint = {},
    // 页面时自定义事件无意义
    TCustomEvents extends IfExtends<TIsPage, false, CustomEventConstraint, EmptyObject> = {},
    TMethods extends MethodsConstraint = {},
    EventsDoc extends object = IfExtends<EventsConstraint<TReceivedComponentDoc>, TEvents, {}, TEvents>,
    CustomEventsDoc extends object = GetCustomEventDoc<TCustomEvents>,
    PropertiesDoc extends object = GetPropertiesDoc<TProperties>,
    DataDoc extends object = GetDataDoc<TData>,
    ComputedDoc extends object = GetComputedDoc<TComputed>,
  >(
    options: Options<
      TReceivedComponentDoc,
      TEvents,
      TIsPage,
      TCustomEvents,
      TMethods,
      TProperties,
      TData,
      TComputed,
      EventsDoc,
      CustomEventsDoc,
      PropertiesDoc,
      DataDoc,
      ComputedDoc
    >,
  ): // 返回类型 RootComponentDoc
  ComputeIntersectionDeep<
    & IfExtends<TIsPage, false, {}, { isPage: true }>
    & IfExtends<EmptyObject, PropertiesDoc, {}, { properties: PropertiesDoc }>
    & IfExtends<EmptyObject, DataDoc, {}, { data: DataDoc }>
    & IfExtends<EmptyObject, ComputedDoc, {}, { computed: ComputedDoc }>
    & IfExtends<EmptyObject, TMethods, {}, { methods: TMethods }>
    & IfExtends<EmptyObject, EventsDoc, {}, { events: EventsDoc }>
    & IfExtends<EmptyObject, CustomEventsDoc, {}, { customEvents: CustomEventsDoc }>
  >;
};

export function RootComponent<
  // ComponentDoc表示RootComponent作为单独组件,ComponentDoc[]表示RootComponent作为多个子组件的根组件
  TReceivedComponentDoc extends ComponentDoc[] | ComponentDoc = {},
>(): RootComponentConstructor<
  TReceivedComponentDoc
> {
  return (options: any) => options;
}

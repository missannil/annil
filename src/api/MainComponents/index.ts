import type { AnyObject, O } from "hry-types";
import type { As } from "hry-types/src/Any/As";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IsNever } from "hry-types/src/Any/IsNever";
import { InstanceInject } from "../..";
import type { Computed } from "./Computed";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { GetComputedDoc } from "./Computed/GetComputedDoc";
import type { CustomEvents } from "./CustomEvents";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
import type { GetCustomEventDoc } from "./CustomEvents/GetCustomEventDoc";
import type { Data } from "./Data.ts";
import type { DataConstraint } from "./Data.ts/DataConstraint";
import type { GetDataDoc } from "./Data.ts/GetDataDoc";
import type { Events } from "./Events.ts";
import type { EventsConstraint } from "./Events.ts/EventsConstraint";
import type { GetMainComponentDoc } from "./GetMainComponentDoc";
import type { IsPage } from "./IsPage";
import type { Lifetimes } from "./Lifetimes";
import type { Methods } from "./Methods";
import type { MethodsConstraint } from "./Methods/MethodsConstraint";
import type { PageLifetimes } from "./PageLifetimes";
import type { Properties } from "./Properties";
import type { GetPropertiesDoc } from "./Properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "./Properties/PropertiesConstraint";
import type { WatchConstraint } from "./Watch/WatchConstraint";

type Options<
  TEvents extends EventsConstraint,
  TIsPage extends boolean,
  TCustomEvents extends CustomEventConstraint,
  TMethods extends MethodsConstraint,
  TProperties extends PropertiesConstraint,
  TData extends DataConstraint,
  TComputed extends ComputedConstraint,
  EventsDoc extends AnyObject,
  IsPageDoc extends boolean,
  CustomEventsDoc extends AnyObject,
  PropertiesDoc extends AnyObject,
  DataDoc extends AnyObject,
  ComputedDoc extends AnyObject,
> // WatchData extends AnyObject =
 = //   & ComputedDoc
  //   & Required<O.NonNullable<As<PropertiesDoc, object>>>
  //   & O.ReturnTypeInObject<GetDataDoc<InstanceInject["data"] & {}, "返回函数字段">>
  //   & DataDoc,
  & Events<TEvents>
  & Methods<TMethods, EventsDoc, CustomEventsDoc>
  & Properties<TProperties>
  & IsPage<TIsPage>
  & CustomEvents<TCustomEvents, EventsDoc>
  & Data<TData, PropertiesDoc>
  & Computed<TComputed, PropertiesDoc, DataDoc, ComputedDoc>
  & PageLifetimes<IsPageDoc, PropertiesDoc>
  & Lifetimes<IsPageDoc>
  & WatchConstraint<
    & ComputedDoc
    & Required<O.NonNullable<As<PropertiesDoc, object>>>
    & O.ReturnTypeInObject<GetDataDoc<InstanceInject["data"] & {}, "返回函数字段">>
    & DataDoc
  >;

type Constructor = {
  <
    Literal extends
      | string
      | number
      | boolean
      | Literal[]
      | Record<string, Literal>,
    // TEvents 不能有默认值{} 会引起事件参数类型(e)失效
    TEvents extends EventsConstraint,
    TProperties extends PropertiesConstraint<Literal> = {},
    TIsPage extends boolean = false,
    // TIsPage为false时(组件)才允许写自定义事件(customEvents字段)
    TCustomEvents extends TIsPage extends false ? CustomEventConstraint : never = never,
    // TCustomEvents extends CustomEventConstraint = {},
    TMethods extends MethodsConstraint = {},
    TData extends DataConstraint = {},
    TComputed extends ComputedConstraint = {},
    EventsDoc extends {} = IfExtends<EventsConstraint, TEvents, {}, TEvents>,
    IsPageDoc extends boolean = TIsPage,
    CustomEventsDoc extends {} = IsNever<TCustomEvents> extends true ? {} : GetCustomEventDoc<TCustomEvents>,
    // TComputed必须要有默认值,可使得计算A调用计算B的值
    PropertiesDoc extends {} = GetPropertiesDoc<TProperties>,
    DataDoc extends {} = GetDataDoc<TData>,
    ComputedDoc extends {} = GetComputedDoc<TComputed>,
  > // 切记 具体类型应定义在这里,而非Options中
  (
    options: Options<
      TEvents,
      TIsPage,
      TCustomEvents,
      TMethods,
      TProperties,
      TData,
      TComputed,
      EventsDoc,
      IsPageDoc,
      CustomEventsDoc,
      PropertiesDoc,
      DataDoc,
      ComputedDoc
    >,
  ): GetMainComponentDoc<
    PropertiesDoc,
    DataDoc,
    ComputedDoc,
    EventsDoc,
    CustomEventsDoc,
    TMethods,
    TIsPage
  >;
};

export const MainComponent: Constructor = function(options): any {
  return options;
};

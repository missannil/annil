import type { O } from "hry-types";
import type { As } from "hry-types/src/Any/As";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IsNever } from "hry-types/src/Any/IsNever";
import type { IReactionDisposer } from "mobx";
import type { WMInstanceMethods, WMInstanceProperties } from "../../types/officialAlias";
import type { Computed } from "./Computed";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { GetComputedDoc } from "./Computed/GetComputedDoc";
import type { CustomEvents } from "./CustomEvents";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
import type { GetCustomEventDoc } from "./CustomEvents/GetCustomEventDoc";
import type { Data } from "./Data";
import type { DataConstraint } from "./Data/DataConstraint";
import type { GetDataDoc } from "./Data/GetDataDoc";
import type { Events } from "./Events";
import type { EventsConstraint } from "./Events/EventsConstraint";
import type { GetMainComponentDoc } from "./GetMainComponentDoc";
import type { CustomEventMethods } from "./Instance/CustomEventMethods";
import type { CustomSetData } from "./Instance/CustomSetData";
import type { IsPage } from "./IsPage";
import type { Lifetimes } from "./Lifetimes";
import type { Methods } from "./Methods";
import type { MethodsConstraint } from "./Methods/MethodsConstraint";
import type { PageLifetimes } from "./PageLifetimes";
import type { Properties } from "./Properties";
import type { GetPropertiesDoc } from "./Properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "./Properties/PropertiesConstraint";
import type { Watch } from "./Watch";

export type Instance<
  TMethods,
  TData extends DataConstraint,
  AllData extends object,
  CustomEventsDoc extends object,
  ResponsiveData = GetDataDoc<TData, "返回函数字段">,
> // TMethods,
 =
  // 官方实例属性is  options  dataset等
  & WMInstanceProperties
  // 官方实例方法去除setData,因其类型宽泛
  & Omit<WMInstanceMethods<{}>, "setData">
  // 加入自定义setData方法
  & CustomSetData<GetDataDoc<TData, "去掉函数字段">>
  & IfExtends<
    {},
    ResponsiveData,
    unknown,
    {
      __disposer: { [k in keyof ResponsiveData]: IReactionDisposer };
      _applySetData: (callback?: Function) => void;
    }
  >
  & TMethods
  & CustomEventMethods<CustomEventsDoc>
  & { data: O.ComputeIntersection<AllData> };

type Options<
  TEvents extends EventsConstraint,
  TIsPage extends boolean,
  TCustomEvents extends CustomEventConstraint,
  TMethods extends MethodsConstraint,
  TProperties extends PropertiesConstraint,
  TData extends DataConstraint,
  TComputed extends ComputedConstraint,
  EventsDoc extends object,
  IsPageDoc extends boolean,
  CustomEventsDoc extends object,
  PropertiesDoc extends object,
  DataDoc extends object,
  ComputedDoc extends object,
> =
  & Events<TEvents>
  & Methods<TMethods, EventsDoc, CustomEventsDoc>
  & Properties<TProperties>
  & IsPage<TIsPage>
  & CustomEvents<TCustomEvents, EventsDoc>
  & Data<TData, PropertiesDoc>
  & Computed<TComputed, Required<PropertiesDoc> & DataDoc, ComputedDoc>
  & PageLifetimes<IsPageDoc, PropertiesDoc>
  & Lifetimes<IsPageDoc>
  & Watch<
    & ComputedDoc
    & Required<O.NonNullableInObject<As<PropertiesDoc, object>>>
    & DataDoc
  >
  & ThisType<Instance<TMethods, TData, DataDoc & Required<PropertiesDoc> & ComputedDoc, CustomEventsDoc>>;

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
    TMethods extends MethodsConstraint = {},
    TData extends DataConstraint = {},
    // TComputed必须要有默认值,可使得计算A调用计算B的值
    TComputed extends ComputedConstraint = {},
    EventsDoc extends EventsConstraint = IfExtends<EventsConstraint, TEvents, {}, TEvents>,
    IsPageDoc extends boolean = TIsPage,
    CustomEventsDoc extends object = IsNever<TCustomEvents> extends true ? {} : GetCustomEventDoc<TCustomEvents>,
    PropertiesDoc extends object = GetPropertiesDoc<TProperties>,
    DataDoc extends object = GetDataDoc<TData>,
    ComputedDoc extends object = GetComputedDoc<TComputed>,
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

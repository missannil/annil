import type { O } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import { InstanceInject } from "../..";
import type { Computed } from "./Computed";
import type { ComputedConstraint } from "./Computed/ComputedConstraint";
import type { GetComputedDoc } from "./Computed/GetComputedDoc";
import type { CustomEvents } from "./CustomEvents";
import type { CustomEventConstraint } from "./CustomEvents/CustomEventConstraint";
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
import type { Watch } from "./Watch";

type Options<
  TEvents extends EventsConstraint,
  TProperties extends PropertiesConstraint,
  TData extends DataConstraint,
  TComputed extends ComputedConstraint,
  TCustomEvents extends CustomEventConstraint,
  TMethods extends MethodsConstraint,
  TIsPage extends boolean,
  PropertiesDoc,
  DataDoc,
  ComputedDoc,
> =
  & Properties<TProperties>
  & IsPage<TIsPage>
  & Data<TData, TProperties>
  & Computed<TComputed, PropertiesDoc, DataDoc, ComputedDoc>
  & Events<TEvents>
  & PageLifetimes<TIsPage, PropertiesDoc>
  & Lifetimes<TIsPage>
  & CustomEvents<TCustomEvents, TEvents, TIsPage>
  & Methods<TMethods, TEvents, TCustomEvents>
  & Watch<
    & ComputedDoc
    & PropertiesDoc
    & DataDoc
    & IfExtends<
      DataConstraint,
      InstanceInject["data"] & {},
      unknown,
      O.ReturnTypeInObject<GetDataDoc<InstanceInject["data"] & {}, "返回函数字段">>
    >
  >;

type Constructor = {
  <
    Literal extends
      | string
      | number
      | boolean
      | Literal[]
      | Record<string, Literal>,
    // TEvents 不能有默认值{} 会导致 事件参数 e失效
    TEvents extends EventsConstraint,
    TProperties extends PropertiesConstraint<Literal> = {},
    TData extends DataConstraint = {},
    // TComputed必须要有默认值
    TComputed extends ComputedConstraint = {},
    TCustomEvents extends CustomEventConstraint = {},
    TMethods extends MethodsConstraint = {},
    PropertiesDoc = IfExtends<{}, TProperties, unknown, GetPropertiesDoc<TProperties>>,
    DataDoc = IfExtends<{}, TData, unknown, GetDataDoc<TData>>,
    ComputedDoc = IfExtends<{}, TComputed, unknown, GetComputedDoc<TComputed>>,
    TIsPage extends boolean = false,
  >(
    options: Options<
      TEvents,
      TProperties,
      TData,
      TComputed,
      TCustomEvents,
      TMethods,
      TIsPage,
      PropertiesDoc,
      DataDoc,
      ComputedDoc
    >,
  ): GetMainComponentDoc<
    PropertiesDoc,
    DataDoc,
    ComputedDoc,
    TEvents,
    TCustomEvents,
    TMethods,
    TIsPage
  >;
};

export const MainComponent: Constructor = function(options): any {
  return options;
};

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputedConstraint } from "../types/computed/ComputedConstraint";
import type { GetComputedDoc } from "../types/computed/GetComputedDoc";
import type { CustomEventConstraint } from "../types/CustomEvent/CustomEventConstraint";
import type { DataConstraint } from "../types/data/DataConstraint";
import type { GetDataDoc } from "../types/data/GetDataDoc";
import type { GetPropertiesDoc } from "../types/properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "../types/properties/PropertiesConstraint";

import type {
  DuplicateFieldValidation,
  IllegalFieldValidation,
} from "hry-types/src/Function_generic_value_validation/_api";
import type { RemoveNull } from "../types/CustomEvent/RemoveNull";
import type { EventsConstraint } from "../types/Events/EventsConstraint";
import type { WMCompLifetimes, WMPageLifetime, WMPageLifetimes } from "../types/officialAlias";
import type { ValueValidator } from "../types/properties/ValueValidator";

import type { IinjectDataDoc, IinjectMethodsDoc } from "./InstanceInject";

type Options<
  TEvents extends EventsConstraint,
  TProperties extends PropertiesConstraint,
  TData extends object,
  TComputed extends object,
  TCustomEvents extends CustomEventConstraint,
  TIsPage extends boolean,
  PropertiesDoc,
  DataDoc,
  ComputedDoc,
> =
  & {
    isPage?: TIsPage;
    /**
     * @description 可通过 as SpecificType<anyType> 书写任意类型,禁用observable字段,简写或无value字段为必传属性。对象写法有value字段为可选属性.必传字段若为对象类型则加入默认类型null
     */
    properties?:
      & TProperties
      & DuplicateFieldValidation<TProperties, keyof IinjectDataDoc, "与注入的data字段重复">
      & IllegalFieldValidation<TProperties, "value" | "type" | "optionalTypes", 1>
      & ValueValidator<TProperties>;

    data?:
      & TData
      & DuplicateFieldValidation<TData, keyof IinjectDataDoc, "与注入的data字段重复">
      & DuplicateFieldValidation<TData, keyof TProperties, "与properties字段重复">;
    computed?:
      & TComputed
      & DuplicateFieldValidation<TComputed, keyof IinjectDataDoc, "与注入的data字段重复">
      & DuplicateFieldValidation<TComputed, keyof TProperties, "与properties字段重复">
      & DuplicateFieldValidation<TComputed, keyof TData, "与data字段重复">
      & ThisType<{
        data: Required<PropertiesDoc> & DataDoc & ComputedDoc;
      }>;
    events?:
      & TEvents
      & DuplicateFieldValidation<TEvents, keyof IinjectMethodsDoc, "与注入的methods字段重复">;
  }
  & IfExtends<
    // TIsPage触发  官方Component生命周期 和 自定义事件字段
    TIsPage,
    false,
    {
      pageLifetimes?:
        // 官方组件页面生命周期
        & Partial<WMPageLifetimes>
        // 自定义周期
        & { load?: () => void };
      lifetimes?:
        // 官方组件生命周期
        & Partial<WMCompLifetimes["lifetimes"]>
        // 自定义的周期
        & {
          /**
           * 建立组件时
           * 可使用create字段,但为了避免和created混淆用了beforeCreate字段
           * @param options 配置
           * @returns
           */
          beforeCreate?: (options: any) => void;
        };
      /**
       * 声明组件自定义事件
       * @example
       * ```ts
       * const customEvents = {
       *  customEventA: String, // "string"
       *  customEventB: [String as SpecificType<"male" | "femal">, Number], // "male" | "femal" | number
       *  customEventC: {
       *    detailType: String,
       *    options: {
       *      bubbles: true,
       *      composed: true ,//可选
       *      capturePhase: true,//可选
       *    },
       *  },
       * };
       * ```
       */
      customEvents?:
        & TCustomEvents
        & DuplicateFieldValidation<TCustomEvents, keyof IinjectMethodsDoc, "与注入的methods字段重复">
        & IllegalFieldValidation<TCustomEvents, "bubbles" | "composed" | "capturePhase", 1, "options">
        & IfExtends<
          EventsConstraint,
          TEvents,
          unknown,
          DuplicateFieldValidation<TCustomEvents, keyof TEvents, "与events字段重复">
        >;
    },
    // 自定义页面生命周期
    {
      pageLifetimes?:
        & Partial<Omit<WMPageLifetime, "onLoad">>
        // 替换掉官方的 Parameters<WechatMiniprogram.Page.ILifetime['onLoad']>
        & {
          onLoad?: (
            properties: RemoveNull<Required<PropertiesDoc>>,
          ) => void;
        };
    }
  >;

interface Constructor {
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
    // TMethods extends MethodsConstraint = {},
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
      TIsPage,
      PropertiesDoc,
      DataDoc,
      ComputedDoc
    >,
  ): void;
}

export const MainComponent: Constructor = function(options): any {
  return options;
};

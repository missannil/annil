import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputedConstraint } from "../types/computed/ComputedConstraint";
import type { GetComputedDoc } from "../types/computed/GetComputedDoc";
import type { DataConstraint } from "../types/data/DataConstraint";
import type { GetDataDoc } from "../types/data/GetDataDoc";
import type { GetPropertiesDoc } from "../types/properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "../types/properties/PropertiesConstraint";
import type { ValueValidator } from "../types/properties/ValueValidator";
import type { DuplicateFieldValidation } from "../types/Validation.ts/DuplicateFieldValidation";
import type { IinjectDataDoc } from "./InstanceInject";

type Options<
  TProperties extends object,
  TData extends object,
  TComputed extends object,
  PropertiesDoc,
  DataDoc,
  ComputedDoc,
> = {
  /**
   * @description 可通过 as SpecificType<anyType> 书写任意类型,禁用observable字段,简写或无value字段为必传属性。对象写法有value字段为可选属性.必传字段若为对象类型则加入默认类型null
   */
  properties?:
    & TProperties
    & DuplicateFieldValidation<TProperties, keyof IinjectDataDoc, "与注入的data字段重复">
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
      data: PropertiesDoc & DataDoc & ComputedDoc;
    }>;
};

interface Constructor {
  <
    Literal extends
      | string
      | number
      | boolean
      | Literal[]
      | Record<string, Literal>,
    TProperties extends PropertiesConstraint<Literal> = {},
    TData extends DataConstraint = {},
    TComputed extends ComputedConstraint = {},
    PropertiesDoc = IfExtends<{}, TProperties, unknown, GetPropertiesDoc<TProperties>>,
    DataDoc = IfExtends<{}, TData, unknown, GetDataDoc<TData>>,
    ComputedDoc = IfExtends<{}, TComputed, unknown, GetComputedDoc<TComputed>>,
  >(
    options: Options<TProperties, TData, TComputed, PropertiesDoc, DataDoc, ComputedDoc>,
  ): void;
}

export const MainComponent: Constructor = function(options): any {
  return options;
};

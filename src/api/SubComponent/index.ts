import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { RequiredKeys } from "hry-types/src/Object/RequiredKeys";
import type { ExtractDocPrefix } from "../../types/GetComponentPrefix";
import type { ReplacePrefix } from "../../types/ReplacePrefix";
import type { ComponentDoc } from "../DefineComponent/ReturnType/ComponentDoc";
import type { GetDataDoc } from "../RootComponent/Data/GetDataDoc";

import type { WMCompLifetimes, WMCompPageLifetimes, WMPageLifetimes } from "../../types/officialAlias";
import type { RootComponentDoc } from "../RootComponent/RootComponentDoc";
import type { GetSubComputedDoc } from "./SubComputed/GetSubComputedDoc";
import type { SubComputedConstraint } from "./SubComputed/SubComputedConstraint";
import type { SubComputedOption } from "./SubComputed/SubComputedOption";
import type { SubDataConstraint } from "./SubData/SubDataConstraint";
import type { SubDataOption } from "./SubData/SubDataOption";
import type { SubEventsConstraint } from "./SubEvents/SubEventsConstraint";
import type { SubEventsOption } from "./SubEvents/SubEventsOptions";
import type { InheritConstraint } from "./SubInherit/SubInheritConstraint";
import type { SubInstance } from "./SubInstance/SubInstance";
import type { SubLifetimesOption } from "./SubLifetimes/SubLifetimesOption";
import type { SubMethodsConstraint } from "./SubMethods/SubMethodsConstraint";
import type { SubMethodsOption } from "./SubMethods/SubMethodsOption";
import type { SubPageLifetimesOption } from "./SubPageLifetimes/SubPageLifetimesOption";
import type { CreateSubComponentDoc } from "./SubReturnType/CreateSubComponentDoc";
import type { SubWatchOption } from "./SubWatch/SubWatchOption";

type Options<
  RootDoc extends RootComponentDoc,
  IsPage extends boolean,
  CurrentCompDoc extends ComponentDoc,
  Prefix extends string,
  AllRootDataDoc extends object,
  TInherit extends object,
  TSubData extends object,
  TSubComputed extends SubComputedConstraint,
  TEvents extends object,
  TSubMethods extends object,
  InheritDoc extends object,
  SubDataDoc extends object,
  SubComputedDoc extends SubComputedConstraint,
  SubEventsDoc extends object,
  SubMethodsDoc extends object,
> =
  & { inherit?: TInherit }
  & SubDataOption<
    TSubData,
    Exclude<keyof CurrentCompDoc["properties"], (keyof InheritDoc)>,
    Prefix
  >
  & SubComputedOption<
    TSubComputed,
    AllRootDataDoc & SubDataDoc & SubComputedDoc,
    // 合法的配置
    Omit<CurrentCompDoc["properties"], (keyof InheritDoc) | (keyof SubDataDoc)>
  >
  & SubEventsOption<TEvents, SubEventsDoc, keyof SubEventsConstraint<CurrentCompDoc>>
  & SubMethodsOption<TSubMethods, Prefix, keyof CurrentCompDoc["customEvents"]>
  & SubPageLifetimesOption<IsPage, RootDoc["properties"] & {}>
  & SubLifetimesOption
  & SubWatchOption<
    & SubComputedDoc
    & SubDataDoc
    & AllRootDataDoc
  >
  & ThisType<
    SubInstance<
      SubMethodsDoc & RootDoc["methods"],
      TSubData,
      AllRootDataDoc & SubDataDoc & SubComputedDoc,
      RootDoc["customEvents"] & {}
    >
  >;

type SubComponentConstructor<
  TRootDoc extends RootComponentDoc,
  TOriginalCompDoc extends ComponentDoc,
  // 补充的前缀
  TSupplementalPrefix extends string = "",
  IsPage extends boolean = TRootDoc["isPage"] extends true ? true : false,
  // 重构子组件的前缀
  CurrentPrefix extends string = `${ExtractDocPrefix<TOriginalCompDoc>}${Capitalize<TSupplementalPrefix>}`,
  // 更新原始文档的前缀为Prefix
  CurrentCompDoc extends ComponentDoc = IfExtends<
    TSupplementalPrefix,
    "",
    TOriginalCompDoc,
    ReplacePrefix<TOriginalCompDoc, CurrentPrefix>
  >,
  AllRootDataDoc extends object =
    & Required<TRootDoc["properties"]>
    & TRootDoc["data"]
    & TRootDoc["computed"],
> = {
  <
    TInherit extends InheritConstraint<AllRootDataDoc, CurrentCompDoc>,
    TSubData extends SubDataConstraint<Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>>,
    TEvents extends SubEventsConstraint<CurrentCompDoc>,
    TSubComputed extends SubComputedConstraint<
      Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc | keyof SubDataDoc>
    > = {},
    TSubMethods extends SubMethodsConstraint = {},
    InheritDoc extends object = IfExtends<InheritConstraint<AllRootDataDoc, CurrentCompDoc>, TInherit, {}, TInherit>,
    SubDataDoc extends object = IfExtends<
      SubDataConstraint<Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>>,
      TSubData,
      {},
      GetDataDoc<TSubData>
    >,
    // 无效的计算
    // SubComputedDoc extends ComputedConstraint = GetSubComputedDoc<TSubComputed>,
    SubEventsDoc extends object = IfExtends<
      SubEventsConstraint<CurrentCompDoc>,
      TEvents,
      {},
      TEvents
    >,
    SubMethodsDoc extends object = TSubMethods,
    // 缺失的必传字段(配置中inhrit,data,computed的字段不包含的必传字段)
    MissingRequiredField extends PropertyKey = Exclude<
      RequiredKeys<CurrentCompDoc["properties"] & {}>,
      keyof (InheritDoc & SubDataDoc & GetSubComputedDoc<TSubComputed>)
    >,
  >(
    options: Options<
      TRootDoc,
      IsPage,
      CurrentCompDoc,
      CurrentPrefix,
      AllRootDataDoc,
      TInherit,
      TSubData,
      TSubComputed,
      TEvents,
      TSubMethods,
      InheritDoc,
      SubDataDoc,
      GetSubComputedDoc<TSubComputed>,
      SubEventsDoc,
      SubMethodsDoc
    >,
  ): CreateSubComponentDoc<TOriginalCompDoc["customEvents"] & {}, SubEventsDoc, MissingRequiredField>;
};

/**
 * 子组件构建函数
 * @returns `(options:) => SubComponentDoc`
 */
export function SubComponent<
  RootDoc extends RootComponentDoc,
  CompDoc extends ComponentDoc,
  Prefix extends string = "",
>(): IfExtends<EmptyObject, CompDoc, (opt: EmptyObject) => never, SubComponentConstructor<RootDoc, CompDoc, Prefix>> {
  return ((options: any) => options) as any;
}

export type SubComponentOptions = {
  inhrit?: string;
  data?: Record<string, unknown>;
  computed?: Record<string, Function>;
  event?: Record<string, Function>;
  methods?: Record<string, Function>;
  watch?: Record<string, Function>;
  lifetimes?: WMCompLifetimes["lifetimes"];
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: Function } & WMPageLifetimes>;
};

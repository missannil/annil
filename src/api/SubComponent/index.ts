import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { RequiredKeys } from "hry-types/src/Object/RequiredKeys";
import type { ExtractDocPrefix } from "../../types/GetComponentPrefix";
import type { ReplacePrefix } from "../../types/ReplacePrefix";
import type { ComponentDoc } from "../DefineComponent/ReturnType/ComponentDoc";

import type { Func } from "hry-types/src/Misc/Func";
import type {
  WMCompLifetimes,
  WMCompOtherOption,
  WMCompPageLifetimes,
  WMPageLifetimes,
} from "../../types/officialCorrelation";
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
import type { SubStoreConstraint } from "./SubStore/SubDataConstraint";
import type { SubStoreOption } from "./SubStore/SubStoreOption";
import type { SubWatchOption } from "./SubWatch/SubWatchOption";

type Options<
  RootDoc extends RootComponentDoc,
  IsPage extends boolean,
  CurrentCompDoc extends ComponentDoc,
  Prefix extends string,
  AllRootDataDoc extends object,
  TInherit extends object,
  TSubData extends object,
  TSubStore extends object,
  TSubComputed extends SubComputedConstraint,
  TEvents extends object,
  TSubMethods extends object,
  InheritDoc extends object,
  SubDataDoc extends object,
  SubStoreDoc extends object,
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
  & SubStoreOption<
    TSubStore,
    Exclude<keyof CurrentCompDoc["properties"], (keyof (InheritDoc & SubDataDoc))>,
    Prefix
  >
  & SubComputedOption<
    TSubComputed,
    AllRootDataDoc & SubDataDoc & SubDataDoc & SubComputedDoc,
    // 合法的配置
    Omit<CurrentCompDoc["properties"], (keyof (InheritDoc & SubDataDoc & SubStoreDoc))>
  >
  & SubEventsOption<TEvents, SubEventsDoc, keyof SubEventsConstraint<CurrentCompDoc>>
  & SubMethodsOption<TSubMethods, Prefix, keyof CurrentCompDoc["customEvents"]>
  & SubPageLifetimesOption<IsPage, RootDoc["properties"] & {}>
  & SubLifetimesOption
  & SubWatchOption<
    & SubComputedDoc
    & SubDataDoc
    & AllRootDataDoc
    & SubStoreDoc
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes">>
  & ThisType<
    SubInstance<
      SubMethodsDoc & RootDoc["methods"],
      TSubData,
      AllRootDataDoc & SubDataDoc & SubComputedDoc & SubStoreDoc,
      RootDoc["customEvents"] & {},
      SubStoreDoc
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
    TSubStore extends SubStoreConstraint<Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc)>>,
    TEvents extends SubEventsConstraint<CurrentCompDoc>,
    TSubComputed extends SubComputedConstraint = {},
    TSubMethods extends SubMethodsConstraint = {},
    InheritDoc extends object = IfExtends<InheritConstraint<AllRootDataDoc, CurrentCompDoc>, TInherit, {}, TInherit>,
    SubDataDoc extends object = IfExtends<
      SubDataConstraint<Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>>,
      TSubData,
      {},
      TSubData
    >,
    SubStoreDoc extends object = IfExtends<
      SubStoreConstraint<Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc)>>,
      TSubStore,
      {},
      { [k in keyof TSubStore]: ReturnType<TSubStore[k] & {}> }
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
      keyof (InheritDoc & SubDataDoc & SubStoreDoc & GetSubComputedDoc<TSubComputed>)
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
      TSubStore,
      TSubComputed,
      TEvents,
      TSubMethods,
      InheritDoc,
      SubDataDoc,
      SubStoreDoc,
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

// 相比与 export type TrivialOption = Options<{},...>,更直观字段和类型,但断耦合,注意类型是否正确.这是为最终生成官方Component API 的options参数而生。
export type SubComponentOptions = {
  inhrit?: string;
  data?: Record<string, unknown>;
  computed?: Record<string, Func>;
  events?: Record<string, Func>;
  methods?: Record<string, Func>;
  watch?: Record<string, Func>;
  lifetimes?: WMCompLifetimes["lifetimes"];
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: Func } & WMPageLifetimes>;
};

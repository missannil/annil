import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { Func } from "hry-types/src/Misc/Func";
import type { RequiredKeys } from "hry-types/src/Object/RequiredKeys";
import type { ComputeObject } from "../../types/ComputeObj";
import type { GetComponentPrefix } from "../../types/GetComponentPrefix";
import type { InnerFields } from "../../types/InnerData";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { Replace } from "../../types/Replace";
import type { ReplacePrefix } from "../../types/ReplacePrefix";
import type { ComponentType } from "../DefineComponent/ReturnType/ComponentType";
import type { IInjectAllData, IInjectStore } from "../InstanceInject/instanceConfig";
import type { ComputedConstraint } from "../RootComponent/Computed/ComputedConstraint";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { RootComponentType } from "../RootComponent/RootComponentType";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";
import type { GetSubComputedDoc } from "./SubComputed/GetSubComputedDoc";
import type { SubComputedConstraint } from "./SubComputed/SubComputedConstraint";
import type { SubComputedOption } from "./SubComputed/SubComputedOption";
import type { SubDataConstraint } from "./SubData/SubDataConstraint";
import type { SubDataOption } from "./SubData/SubDataOption";
import type { SubEventsConstraint } from "./SubEvents/SubEventsConstraint";
import type { SubEventsOption } from "./SubEvents/SubEventsOptions";
import type { InheritConstraint } from "./SubInherit/SubInheritConstraint";
import type { SubInheritOption } from "./SubInherit/SubInheritOption";
import type { SubInstance } from "./SubInstance/SubInstance";
import type { SubLifetimesOption } from "./SubLifetimes/SubLifetimesOption";
import type { SubMethodsConstraint } from "./SubMethods/SubMethodsConstraint";
import type { SubMethodsOption } from "./SubMethods/SubMethodsOption";
import type { SubObserversOption } from "./SubObservers/SubObserversOption";
import type { SubPageLifetimesOption } from "./SubPageLifetimes/SubPageLifetimesOption";
import type { CreateSubComponentDoc } from "./SubReturnType/CreateSubComponentDoc";
import type { SubStoreConstraint } from "./SubStore/SubStoreConstraint";
import type { SubStoreOption } from "./SubStore/SubStoreOption";
import type { SubWatchOption } from "./SubWatch/SubWatchOption";

type Options<
  RootDoc extends RootComponentType,
  IsPage extends boolean,
  CurrentCompDoc extends ComponentType,
  Prefix extends string,
  AllRootDataDoc extends object,
  TInherit extends object,
  TSubData extends object,
  TSubStore extends object,
  TSubComputed extends object,
  TEvents extends object,
  TSubMethods extends SubMethodsConstraint,
  InheritDoc extends object,
  SubDataDoc extends object,
  SubStoreDoc extends object,
  SubComputedDoc extends object,
  SubEventsDoc extends object,
  SubMethodsDoc extends object,
  CompDocKeys extends PropertyKey = keyof CurrentCompDoc["properties"],
> =
  & SubInheritOption<TInherit, CompDocKeys>
  & SubDataOption<
    TSubData,
    // 合法的配置
    Exclude<CompDocKeys, (keyof InheritDoc)> | InnerFields<Prefix>
  >
  & SubStoreOption<
    TSubStore,
    // 合法的配置
    Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc))> | InnerFields<Prefix>
  >
  & SubComputedOption<
    TSubComputed,
    // 合法的配置
    Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc & SubStoreDoc))> | InnerFields<Prefix>,
    {
      data: ComputeObject<
        & AllRootDataDoc
        & Replace<SubComputedDoc, Required<CurrentCompDoc["properties"]>>
        & SubStoreDoc
        & SubDataDoc
        & IInjectAllData
      >;
    }
  >
  // 无需与根组件的events字段重复检测,因为根组件多了bubbles字段,一定不会重复
  & SubEventsOption<TEvents, SubEventsDoc, keyof SubEventsConstraint<CurrentCompDoc>>
  & SubMethodsOption<TSubMethods, Prefix, keyof (CurrentCompDoc["customEvents"] & SubEventsDoc)>
  & SubPageLifetimesOption<IsPage, NonNullable<RootDoc["properties"]>>
  & SubLifetimesOption
  & SubWatchOption<
    & SubComputedDoc
    & SubDataDoc
    & AllRootDataDoc
    & SubStoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "export" | "observers" | "relations">>
  & SubObserversOption<
    & SubComputedDoc
    & SubDataDoc
    & AllRootDataDoc
    & SubStoreDoc
    & IInjectStore
  >
  & ThisType<
    SubInstance<
      SubMethodsDoc & RootDoc["methods"],
      Replace<SubDataDoc, Required<CurrentCompDoc["properties"]>>,
      AllRootDataDoc & Replace<SubDataDoc & SubComputedDoc & SubStoreDoc, Required<CurrentCompDoc["properties"]>>,
      NonNullable<RootDoc["customEvents"]>,
      SubStoreDoc
    >
  >;

type SubComponentConstructor<
  TRootDoc extends RootComponentType,
  TOriginalCompDoc extends ComponentType,
  // 补充的前缀
  TSupplementalPrefix extends string = "",
  IsPage extends boolean = TRootDoc["isPage"] extends true ? true : false,
  // 重构子组件的前缀
  CurrentPrefix extends string = `${GetComponentPrefix<TOriginalCompDoc>}${Capitalize<TSupplementalPrefix>}`,
  // 更新原始文档的前缀为Prefix
  CurrentCompDoc extends ComponentType = IfExtends<
    TSupplementalPrefix,
    "",
    TOriginalCompDoc,
    ReplacePrefix<TOriginalCompDoc, CurrentPrefix>
  >,
  AllRootDataDoc extends object =
    // rootDoc中的properties是带有可选的,这是为了给使用者(上层组件)提示,而在自身组件实例中并不存在可选状态,故加了Required,正因加了Required使得最终结果不可能为unknown而是`{}`,满足object约束
    & Required<TRootDoc["properties"]> // Required<unknown> = {}
    & TRootDoc["data"]
    & TRootDoc["computed"]
    & TRootDoc["store"],
> = <
  TInherit extends InheritConstraint<AllRootDataDoc, CurrentCompDoc>,
  TSubData extends SubDataConstraint<
    & Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TSubStore extends SubStoreConstraint<
    & Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc)>
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TEvents extends SubEventsConstraint<CurrentCompDoc>,
  // 加默认值计算字段无提示且需要手写返回类型,不加watch无法对computed监控
  TSubComputed extends SubComputedConstraint<
    & Omit<
      Required<CurrentCompDoc["properties"]>,
      keyof (InheritDoc & SubDataDoc & SubStoreDoc)
    >
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TSubMethods extends SubMethodsConstraint = {},
  InheritDoc extends object = IfExtends<InheritConstraint<AllRootDataDoc, CurrentCompDoc>, TInherit, {}, TInherit>,
  SubDataDoc extends object = IfExtends<
    SubDataConstraint<
      & Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>
      & Record<InnerFields<CurrentPrefix>, unknown>
    >,
    TSubData,
    {},
    TSubData
  >,
  SubStoreDoc extends object = IfExtends<
    SubStoreConstraint<
      & Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc)>
      & Record<InnerFields<CurrentPrefix>, unknown>
    >,
    TSubStore,
    {},
    { [k in keyof TSubStore]: ReturnType<NonNullable<TSubStore[k]>> }
  >,
  // 无效的计算
  SubComputedDoc extends object = IfExtends<
    SubComputedConstraint<
      & Omit<
        Required<CurrentCompDoc["properties"]>,
        keyof (InheritDoc & SubDataDoc & SubStoreDoc)
      >
      & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
    >,
    TSubComputed,
    {},
    GetSubComputedDoc<TSubComputed>
  >,
  SubEventsDoc extends object = IfExtends<
    SubEventsConstraint<CurrentCompDoc>,
    TEvents,
    {},
    TEvents
  >,
  SubMethodsDoc extends object = TSubMethods,
  // 缺失的必传字段(配置中inhrit,data,computed的字段不包含的必传字段)
  MissingRequiredField extends PropertyKey = Exclude<
    RequiredKeys<NonNullable<CurrentCompDoc["properties"]>>,
    keyof (
      & InheritDoc
      & SubDataDoc
      & SubStoreDoc
      // 改用SubComputedDoc是会报错的
      & IfExtends<
        SubComputedConstraint<
          Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc & SubStoreDoc)>
        >,
        TSubComputed,
        {},
        GetSubComputedDoc<TSubComputed>
      >
    )
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
    SubComputedDoc,
    SubEventsDoc,
    SubMethodsDoc
  >,
) => CreateSubComponentDoc<NonNullable<CurrentCompDoc["customEvents"]>, SubEventsDoc, MissingRequiredField>;

/**
 * 子组件构建函数
 * @returns `(options:) => SubComponentDoc`
 */
export function SubComponent<
  RootDoc extends RootComponentType,
  CompDoc extends ComponentType,
  Prefix extends string = "",
>(): IfExtends<EmptyObject, CompDoc, (opt: EmptyObject) => never, SubComponentConstructor<RootDoc, CompDoc, Prefix>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((options: any) => options as SubComponentTrueOptions) as any;
}

export type SubComponentTrueOptions = {
  inhrit?: string;
  data?: DataConstraint;
  computed?: ComputedConstraint;
  store?: StoreConstraint;
  events?: EventsConstraint;
  methods?: MethodsConstraint;
  // behaviors?: string[];
  observers?: Record<string, Func>;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?:
    | PageLifetimesOption<false, object>["pageLifetimes"]
    | PageLifetimesOption<true, object>["pageLifetimes"];
};

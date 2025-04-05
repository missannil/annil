import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { Func } from "hry-types/src/Misc/Func";
import type { RequiredKeys } from "hry-types/src/Object/RequiredKeys";
import type { ComputeObject } from "../../types/ComputeObj";
import type { Extra } from "../../types/Extra";
import type { GetComponentPrefix } from "../../types/GetComponentPrefix";
import type { InnerFields } from "../../types/InnerData";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { Replace } from "../../types/Replace";
import type { ReplacePrefix } from "../../types/ReplacePrefix";
import type { UnionToComma } from "../../types/UnionToComma.test";
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
import type { CustomComputedConstraint } from "./CustomComputed/CustomComputedConstraint";
import type { CustomComputedOption } from "./CustomComputed/CustomComputedOption";
import type { GetCustomComputedDoc } from "./CustomComputed/GetCustomComputedDoc";
import type { CustomDataConstraint } from "./CustomData/CustomDataConstraint";
import type { CustomDataOption } from "./CustomData/CustomDataOption";
import type { CustomEventsConstraint } from "./CustomEvents/CustomEventsConstraint";
import type { CustomEventsOption } from "./CustomEvents/CustomEventsOption";
import type { CustomInheritConstraint } from "./CustomInherit/CustomInheritConstraint";
import type { CustomInheritOption } from "./CustomInherit/CustomInheritOption";
import type { CustomInstance } from "./CustomInstance/SubInstance";
import type { CustomLifetimesOption } from "./CustomLifetimes/SubLifetimesOption";
import type { CustomMethodsConstraint } from "./CustomMethods/CustomMethodsConstraint";
import type { CustomMethodsOption } from "./CustomMethods/CustomMethodsOption";
import type { CustomObserversOption } from "./CustomObservers/CustomObserversOption";
import type { CustomPageLifetimesOption } from "./CustomPageLifetimes/CustomPageLifetimesOption";
import type { CreatCustomComponentDoc } from "./CustomReturnType/CreateCustomComponentDoc";
import type { CustomStoreConstraint } from "./CustomStore/CustomStoreConstraint";
import type { CustomStoreOption } from "./CustomStore/CustomStoreOption";
import type { CustomWatchOption } from "./CustomWatch/CustomWatchOption";
// type getLegalKeys<K> = K extends Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc))> ? K
//   : K extends keyof AllRootDataDoc ? never
//   : K extends Extract<Exclude<keyof NoInfer<TSubStore>, keyof SubDataDoc>, InnerFields<Prefix>> ? K
//   : never;
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
  TSubMethods extends CustomMethodsConstraint,
  InheritDoc extends object,
  SubDataDoc extends object,
  SubStoreDoc extends object,
  SubComputedDoc extends object,
  SubEventsDoc extends object,
  SubMethodsDoc extends object,
  CompDocKeys extends PropertyKey = keyof CurrentCompDoc["properties"],
> =
  & CustomInheritOption<
    TInherit,
    {
      [k in keyof NoInfer<TInherit>]:
        // 与根组件的数据字段重复的不合法
        k extends keyof (AllRootDataDoc) ? never
          // 继承CompDocKeys的字段合法
          : k extends CompDocKeys ? k
          : never;
    }[keyof NoInfer<TInherit>]
  >
  & CustomDataOption<
    TSubData,
    // 合法的配置
    {
      [k in keyof NoInfer<TSubData>]:
        // 与根组件和InheritDoc的数据字段重复的不合法
        k extends keyof (AllRootDataDoc) ? never
          // 继承剩余的Doc的字段合法
          : k extends Exclude<CompDocKeys, (keyof (InheritDoc))> ? k
          // 内部字段合法
          : k extends InnerFields<Prefix> ? k
          : never;
    }[keyof NoInfer<TSubData>],
    "子组件无需此字段或与Inherit字段重复"
  >
  & CustomStoreOption<
    TSubStore,
    {
      [k in keyof NoInfer<TSubStore>]:
        // 与根组件和DataDoc的数据字段重复的不合法(主要是验证内部字段)
        k extends keyof (AllRootDataDoc & SubDataDoc) ? never
          // 继承剩余Doc的字段合法
          : k extends Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc))> ? k
          // 内部字段合法
          : k extends InnerFields<Prefix> ? k
          : never;
    }[keyof NoInfer<TSubStore>]
  >
  // 下面为之前的写法 不好与根组件的字段重复检测。

  // // 合法的字段(继承组件类型的keys)
  // | Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc))>
  // // 合法的内部字段(不与data重复的内部字段)
  // | Extract<Exclude<keyof NoInfer<TSubStore>, keyof SubDataDoc>, InnerFields<Prefix>>
  // 不与allData重复的字段
  // | Exclude<keyof NoInfer<TSubStore>, keyof AllRootDataDoc>

  & CustomComputedOption<
    TSubComputed,
    {
      [k in keyof NoInfer<TSubComputed>]:
        // 与根组件和DataDoc和SubStoreDoc的key重复的不合法(主要是验证内部字段)
        k extends keyof (AllRootDataDoc & SubDataDoc & SubStoreDoc) ? never
          // 继承剩余Doc的字段合法
          : k extends Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc & SubStoreDoc))> ? k
          // 内部字段合法
          : k extends InnerFields<Prefix> ? k
          : never;
    }[keyof NoInfer<TSubComputed>],
    // 下面为之前的写法 不好与根组件的字段重复检测。
    // | Exclude<CompDocKeys, (keyof (InheritDoc & SubDataDoc & SubStoreDoc))>
    // | Extract<Exclude<keyof NoInfer<TSubComputed>, keyof (SubDataDoc & SubStoreDoc)>, InnerFields<Prefix>>,
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
  & CustomEventsOption<TEvents, SubEventsDoc, keyof CustomEventsConstraint<CurrentCompDoc>>
  & CustomMethodsOption<TSubMethods, Prefix, keyof (CurrentCompDoc["customEvents"] & SubEventsDoc)>
  & CustomPageLifetimesOption<IsPage, NonNullable<RootDoc["properties"]>>
  & CustomLifetimesOption
  & CustomWatchOption<
    & SubComputedDoc
    & SubDataDoc
    & AllRootDataDoc
    & SubStoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "export" | "observers" | "relations">>
  & CustomObserversOption<
    & SubComputedDoc
    & SubDataDoc
    & AllRootDataDoc
    & SubStoreDoc
    & IInjectStore
  >
  & ThisType<
    CustomInstance<
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
    TOriginalCompDoc & { properties: Extra<CurrentPrefix> }, // 为文档增加格外字段
    ReplacePrefix<TOriginalCompDoc & { properties: Extra<CurrentPrefix> }, CurrentPrefix> // 为文档增加格外字段
  >,
  AllRootDataDoc extends object =
    // rootDoc中的properties是带有可选的,这是为了给使用者(上层组件)提示,而在自身组件实例中并不存在可选状态,故加了Required,正因加了Required使得最终结果不可能为unknown而是`{}`,满足object约束
    & Required<TRootDoc["properties"]> // Required<unknown> = {}
    & TRootDoc["data"]
    & TRootDoc["computed"]
    & TRootDoc["store"],
> = <
  TInherit extends CustomInheritConstraint<AllRootDataDoc, CurrentCompDoc>,
  TSubData extends CustomDataConstraint<
    & Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TSubStore extends CustomStoreConstraint<
    & Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc)>
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TEvents extends CustomEventsConstraint<CurrentCompDoc>,
  // 加默认值计算字段无提示且需要手写返回类型,不加watch无法对computed监控
  TSubComputed extends CustomComputedConstraint<
    & Omit<
      Required<CurrentCompDoc["properties"]>,
      keyof (InheritDoc & SubDataDoc & SubStoreDoc)
    >
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TSubMethods extends CustomMethodsConstraint = {},
  InheritDoc extends object = IfExtends<
    CustomInheritConstraint<AllRootDataDoc, CurrentCompDoc>,
    TInherit,
    {},
    TInherit
  >,
  SubDataDoc extends object = IfExtends<
    CustomDataConstraint<
      & Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>
      & Record<InnerFields<CurrentPrefix>, unknown>
    >,
    TSubData,
    {},
    TSubData
  >,
  SubStoreDoc extends object = IfExtends<
    CustomStoreConstraint<
      & Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc)>
      & Record<InnerFields<CurrentPrefix>, unknown>
    >,
    TSubStore,
    {},
    { [k in keyof TSubStore]: ReturnType<NonNullable<TSubStore[k]>> }
  >,
  // 无效的计算
  SubComputedDoc extends object = IfExtends<
    CustomComputedConstraint<
      & Omit<
        Required<CurrentCompDoc["properties"]>,
        keyof (InheritDoc & SubDataDoc & SubStoreDoc)
      >
      & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
    >,
    TSubComputed,
    {},
    GetCustomComputedDoc<TSubComputed>
  >,
  SubEventsDoc extends object = IfExtends<
    CustomEventsConstraint<CurrentCompDoc>,
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
        CustomComputedConstraint<
          Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & SubDataDoc & SubStoreDoc)>
        >,
        TSubComputed,
        {},
        GetCustomComputedDoc<TSubComputed>
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
) => IfExtends<
  MissingRequiredField,
  never,
  CreatCustomComponentDoc<
    NonNullable<CurrentCompDoc["customEvents"]>,
    SubEventsDoc
  >,
  `缺少必传的字段${UnionToComma<MissingRequiredField & string>}`
>;

/**
 * 子组件构建函数
 * @returns `(options:) => SubComponentDoc`
 */
export function CustomComponent<
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
// export type SubComponentType =string

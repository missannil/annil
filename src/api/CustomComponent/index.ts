import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { RequiredKeys } from "hry-types/src/Object/RequiredKeys";
import type { Extra } from "../../types/Extra";
import type { GetComponentPrefix } from "../../types/GetComponentPrefix";
import type { InnerFields } from "../../types/InnerData";
import type { WMCompOtherOption } from "../../types/OfficialTypeAlias";
import type { Replace } from "../../types/Replace";
import type { ReplacePrefix } from "../../types/ReplacePrefix";
import type { UnionToComma } from "../../types/UnionToComma.test";
import type { ComponentDoc } from "../DefineComponent/returnType/ComponentDoc";
import type { IInjectStore } from "../InstanceInject/instanceConfig";
import type { RootComponentDefinition } from "../RootComponent/returnType";
import type { GetStoreDef } from "../RootComponent/Store/GetStoreDef";
import type { CustomComputedConstraint } from "./CustomComputed/CustomComputedConstraint";
import type { CustomComputedOption } from "./CustomComputed/CustomComputedOption";
import type { GetCustomComputedDoc } from "./CustomComputed/GetCustomComputedDoc";
import type { CustomDataConstraint } from "./CustomData/CustomDataConstraint";
import type { CustomDataOption } from "./CustomData/CustomDataOption";
import type { CustomEventsConstraint } from "./CustomEvents/CustomEventsConstraint";
import type { CustomEventsOption } from "./CustomEvents/CustomEventsOption";
import type { CustomInheritConstraint } from "./CustomInherit/CustomInheritConstraint";
import type { CustomInheritOption } from "./CustomInherit/CustomInheritOption";
import type { CustomInstance } from "./CustomInstance/CustomInstance";
import type { CustomLifetimesOption } from "./CustomLifetimes/CustomLifetimesOption";
import type { CustomMethodsConstraint } from "./CustomMethods/CustomMethodsConstraint";
import type { CustomMethodsOption } from "./CustomMethods/CustomMethodsOption";
import type { CustomObserversOption } from "./CustomObservers/CustomObserversOption";
import type { CustomPageLifetimesOption } from "./CustomPageLifetimes/CustomPageLifetimesOption";
import type { CreateCustomComponentDoc } from "./CustomReturnType/CreateCustomComponentDoc";
import type { CustomStoreConstraint } from "./CustomStore/CustomStoreConstraint";
import type { CustomStoreOption } from "./CustomStore/CustomStoreOption";
import type { CustomWatchOption } from "./CustomWatch/CustomWatchOption";

type Options<
  RootDoc extends RootComponentDefinition,
  IsPage extends boolean,
  CurrentCompDoc extends ComponentDoc,
  Prefix extends string,
  AllRootDataDoc extends object,
  TInherit extends object,
  TCustomData extends object,
  TCustomStore extends object,
  TCustomComputed extends object,
  TEvents extends object,
  TCustomMethods extends CustomMethodsConstraint,
  InheritDoc extends object,
  CustomDataDoc extends object,
  CustomStoreDoc extends object,
  CustomComputedDoc extends object,
  CustomEventsDoc extends object,
  CustomMethodsDoc extends object,
  RootEventKeys extends PropertyKey,
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
    TCustomData,
    // 合法的配置
    {
      [k in keyof NoInfer<TCustomData>]:
        // 与根组件和InheritDoc的数据字段重复的不合法
        k extends keyof (AllRootDataDoc) ? never
          // 继承剩余的Doc的字段合法
          : k extends Exclude<CompDocKeys, (keyof (InheritDoc))> ? k
          // 内部字段合法
          : k extends InnerFields<Prefix> ? k
          : never;
    }[keyof NoInfer<TCustomData>],
    "子组件无需此字段或与Inherit字段重复"
  >
  & CustomStoreOption<
    TCustomStore,
    {
      [k in keyof NoInfer<TCustomStore>]:
        // 与根组件和DataDoc的数据字段重复的不合法(主要是验证内部字段)
        k extends keyof (AllRootDataDoc & CustomDataDoc) ? never
          // 继承剩余Doc的字段合法
          : k extends Exclude<CompDocKeys, (keyof (InheritDoc & CustomDataDoc))> ? k
          // 内部字段合法
          : k extends InnerFields<Prefix> ? k
          : never;
    }[keyof NoInfer<TCustomStore>]
  >
  & CustomComputedOption<
    TCustomComputed,
    {
      [k in keyof NoInfer<TCustomComputed>]:
        // 与根组件和DataDoc和CustomStoreDoc的key重复的不合法(主要是验证内部字段)
        k extends keyof (AllRootDataDoc & CustomDataDoc & CustomStoreDoc) ? never
          // 继承剩余Doc的字段合法
          : k extends Exclude<CompDocKeys, (keyof (InheritDoc & CustomDataDoc & CustomStoreDoc))> ? k
          // 内部字段合法
          : k extends InnerFields<Prefix> ? k
          : never;
    }[keyof NoInfer<TCustomComputed>]
  >
  // 无需与根组件的events字段重复检测,因为根组件多了bubbles字段,一定不会重复,还是要检查,因为根组件可能写与子组件相同的事件名,导致子组件事件被阻止,所以要检查
  & CustomEventsOption<TEvents, CustomEventsDoc, keyof CustomEventsConstraint<CurrentCompDoc>, RootEventKeys>
  & CustomMethodsOption<TCustomMethods, Prefix, keyof (CurrentCompDoc["events"] & CustomEventsDoc)>
  & CustomPageLifetimesOption<IsPage, NonNullable<RootDoc["properties"]>>
  & CustomLifetimesOption
  & CustomWatchOption<
    & CustomComputedDoc
    & CustomDataDoc
    & AllRootDataDoc
    & CustomStoreDoc
    & IInjectStore
  >
  & Partial<Omit<WMCompOtherOption, "pageLifetimes" | "definitionFilter" | "export" | "observers" | "relations">>
  & CustomObserversOption<
    & CustomComputedDoc
    & CustomDataDoc
    & AllRootDataDoc
    & CustomStoreDoc
    & IInjectStore
  >
  & ThisType<
    CustomInstance<
      CustomMethodsDoc & RootDoc["methods"],
      Replace<CustomDataDoc, Required<CurrentCompDoc["properties"]>>, // Replace目的是让setData中的类型与文档中定义的类型一致
      // CustomDataDoc,
      & AllRootDataDoc
      & Replace<CustomDataDoc & CustomComputedDoc & CustomStoreDoc, Required<CurrentCompDoc["properties"]>>, // Replace的目的是让实例中的类型与文档中定义的类型一致
      // AllRootDataDoc & CustomDataDoc & CustomComputedDoc & CustomStoreDoc,
      NonNullable<RootDoc["customEvents"]>,
      CustomStoreDoc
    >
  >;

type CustomComponentConstructor<
  TRootDoc extends RootComponentDefinition,
  TOriginalCompDoc extends ComponentDoc,
  // 补充的前缀
  TSupplementalPrefix extends string = "",
  IsPage extends boolean = TRootDoc["isPage"] extends true ? true : false,
  // 重构子组件的前缀
  CurrentPrefix extends string = `${GetComponentPrefix<TOriginalCompDoc>}${Capitalize<TSupplementalPrefix>}`,
  // 更新原始文档的前缀为Prefix
  CurrentCompDoc extends ComponentDoc = IfExtends<
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
  RootEventKeys extends PropertyKey = IfExtends<unknown, TRootDoc["events"], "", keyof TRootDoc["events"]>,
> = <
  TInherit extends CustomInheritConstraint<AllRootDataDoc, CurrentCompDoc>,
  TData extends CustomDataConstraint<
    & Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TStore extends CustomStoreConstraint<
    Required<TRootDoc["properties"]>,
    & Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & DataDoc)>
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TEvents extends CustomEventsConstraint<CurrentCompDoc>,
  // 加默认值计算字段无提示且需要手写返回类型,不加watch无法对computed监控
  TComputed extends CustomComputedConstraint<
    & Omit<
      Required<CurrentCompDoc["properties"]>,
      keyof (InheritDoc & DataDoc & StoreDoc)
    >
    & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
  >,
  TMethods extends CustomMethodsConstraint = {},
  InheritDoc extends object = IfExtends<
    CustomInheritConstraint<AllRootDataDoc, CurrentCompDoc>,
    TInherit,
    {},
    TInherit
  >,
  DataDoc extends object = IfExtends<
    CustomDataConstraint<
      & Omit<Required<CurrentCompDoc["properties"]>, keyof InheritDoc>
      & Record<InnerFields<CurrentPrefix>, unknown>
    >,
    TData,
    {},
    TData
  >,
  StoreDoc extends object = IfExtends<
    CustomStoreConstraint<
      Required<TRootDoc["properties"]>,
      & Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & DataDoc)>
      & Record<InnerFields<CurrentPrefix>, unknown>
    >,
    TStore,
    {},
    GetStoreDef<TStore>
  >,
  // 无效的计算
  ComputedDoc extends object = IfExtends<
    CustomComputedConstraint<
      & Omit<
        Required<CurrentCompDoc["properties"]>,
        keyof (InheritDoc & DataDoc & StoreDoc)
      >
      & Record<InnerFields<CurrentPrefix>, unknown> // 内部字段
    >,
    TComputed,
    {},
    GetCustomComputedDoc<TComputed>
  >,
  EventsDoc extends object = IfExtends<
    CustomEventsConstraint<CurrentCompDoc>,
    TEvents,
    {},
    TEvents
  >,
  MethodsDoc extends object = TMethods,
  // 缺失的必传字段(配置中inhrit,data,computed的字段不包含的必传字段)
  MissingRequiredField extends PropertyKey = Exclude<
    RequiredKeys<NonNullable<CurrentCompDoc["properties"]>>,
    keyof (
      & InheritDoc
      & DataDoc
      & StoreDoc
      // 改用ComputedDoc是会报错的
      & IfExtends<
        CustomComputedConstraint<
          Omit<Required<CurrentCompDoc["properties"]>, keyof (InheritDoc & DataDoc & StoreDoc)>
        >,
        TComputed,
        {},
        GetCustomComputedDoc<TComputed>
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
    TData,
    TStore,
    TComputed,
    TEvents,
    TMethods,
    InheritDoc,
    DataDoc,
    StoreDoc,
    ComputedDoc,
    EventsDoc,
    MethodsDoc,
    RootEventKeys
  >,
) => IfExtends<
  MissingRequiredField,
  never,
  CreateCustomComponentDoc<
    NonNullable<CurrentCompDoc["events"]>,
    EventsDoc
  >,
  `缺少必传的字段${UnionToComma<MissingRequiredField & string>}`
>;

/**
 * 自定义组件构建函数
 * @returns `(options:) => ComponentDoc`
 */
export function CustomComponent<
  TRootComponentDefinition extends RootComponentDefinition,
  TCompDoc extends ComponentDoc,
  Prefix extends string = "",
>(): IfExtends<
  EmptyObject,
  TCompDoc,
  (opt: EmptyObject) => never,
  CustomComponentConstructor<TRootComponentDefinition, TCompDoc, Prefix>
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((options: any) => options) as any;
}

// type Instance<
//   TMethod,
//   DataWithoutFunc,
//   DataFuncReturn,
//   DataFunc,
//   PropertiesDoc,
//   ComputedDoc,
//   MainMethods,
//   InheritData,
//   MainCustomEvents,
// > = ComputeObj<
//   // 去除官方的实例方法，但除去setData方法 因为它约束宽泛 允许任何字段
//   & Omit<WMInstanceMethods<{}>, "setData">
//   & CustomSetData<DataWithoutFunc>
//   // 立即执行setData 不等待 nextTick
//   & { _applySetData: (callBack?: AnyFunction) => void }
//   // 加入注入的methods
//   & IinjectMethodsDoc
//   // 主自定义事件
//   & CustomEventDocToFunc<MainCustomEvents & {}>
//   & MainMethods
//   & TMethod
//   // data字段
//   & {
//     data: ComputeObj<
//       & DataFuncReturn
//       & InheritData
//       & Required<PropertiesDoc>
//       & ComputedDoc
//       & IinjectDataDoc
//     >;
//   }
//   // 摧毁响应式
//   & IfExtends<
//     unknown,
//     DataFunc,
//     unknown,
//     { _disposer: { [k in keyof DataFunc]: IReactionDisposer } }
//   >
// >;

import type { V } from "hry-types";
import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentDoc } from "../../common_types/ComponentDoc";
import type { ExtractDocPrefix } from "../../common_types/GetComponentPrefix";
import type { MainComponentDoc } from "../../common_types/MainComponentDoc";
import type { ReplacePrefix } from "../../common_types/ReplacePrefix";
import type { PrefixValidator } from "./SubProperties/PrefixValidator";
import type { SubPropertiesConstraint } from "./SubProperties/SubPropertiesConstraint";

type Options<
  TMainComponentDoc extends MainComponentDoc,
  // TComponentDoc extends ComponentDoc,
  CurrentPrefix extends string,
  TProperties extends object,
> // PropertiesDoc,
 = // TEvents,
  // TComputed extends ComputedConstraint,
  // TMethod extends MethodsConstraint,
  // TInherit,
  // Prefix extends string,
  // DataDoc,
  // InheritDoc,
  // // SubCustomEventsDoc extends ICustomEventDoc,
  // DataWithoutFunc = GetDataDoc<
  //   TData,
  //   ComponentDoc["properties"] & {},
  //   "去掉函数字段"
  // >,
  // DataFunc = GetDataDoc<
  //   TData,
  //   ComponentDoc["properties"] & {},
  //   "返回函数字段"
  // >,
  // StandardOfTData = GetStandard<TData>,
  // // ⚠️ComputedDoc 和 GetComputedDoc<TComputed> 不相同。AllData计算时 TComputed是准确的。ComputedDoc计算是初始阶段,所以AllData中不能放ComputedDoc,等ts4.8看吧,不然会导致只写计算属性。得不到缺少字段检测。因为只写计算属性时符合上述情形，test中有示例。⚠️。

  // ComputedDoc = {} extends TComputed ? unknown : GetComputedDoc<TComputed>,
  // TData extends PureObject,
  {
    properties?:
      & TProperties
      & PrefixValidator<TProperties, CurrentPrefix>
      & V.IllegalFieldValidator<TProperties, "value" | "type" | "optionalTypes", 1>
      & V.DuplicateFieldValidator<TProperties, keyof TMainComponentDoc["allData"], "与主组件字段重复">;
  };

// // 提取TData
// & {
//   data?:
//     & TData
//     & ValidationRepeated<DataDoc, PropertiesDoc, () => "⚠️与properties字段重复⚠️">
//     & ValidationRepeated<DataDoc, Main["allData"], () => "⚠️与主数据字段重复⚠️">
//     & ValidationRepeated<DataDoc, InheritDoc, () => "⚠️与inherit字段重复⚠️">
//     & ValidationRepeatedInjectData<DataDoc>
//     & IfExtends<
//       {},
//       ComponentDoc,
//       // TComponentDoc 为{}时 增加'all'前缀验证
//       ValidatorOfPrefix<DataDoc, Prefix>,
//       IfExtends<
//         unknown,
//         ComponentDoc["properties"],
//         // 组件无properties字段时  增加'inner'前缀验证 确保只可以书写内部字段
//         ValidatorOfPrefix<DataDoc, Prefix, "inner">,
//         // 组件有properties字段时
//         & IfExtends<
//           {},
//           StandardOfTData,
//           unknown,
//           // standard字段不可超出范围
//           & ValidationOver<StandardOfTData, ComponentDoc["properties"], () => `⚠️超出文档字段范围⚠️`>
//           // standard字段类型验证 应为 TComponentDoc["properties"]相同key的子类型
//           & ValidationValueType<StandardOfTData, ComponentDoc["properties"]>
//         >
//         & IfExtends<
//           {},
//           GetInner<DataDoc>,
//           unknown,
//           // 有内部字段验证前缀
//           ValidatorOfPrefix<GetInner<DataDoc>, Prefix, "inner">
//         >
//       >
//     >;
// }
// & // 提取TSubComputed
// {
//   computed?:
//     & TComputed
//     // ThisType 只包含 data
//     & ThisType<{
//       data: ComputeObj<
//         & DataDoc
//         & ComputedDoc
//         & PropertiesDoc
//         & Main["allData"]
//         & IinjectDataDoc
//       >;
//     }>
//     // 验证
//     & ValidationRepeatedInjectData<TComputed, "⚠️与注入的data字段重复⚠️">
//     & ValidationRepeated<TComputed, DataDoc, "⚠️与data字段重复⚠️">
//     & ValidationRepeated<TComputed, Main["allData"], "⚠️与主数据字段重复⚠️">
//     & ValidationRepeated<TComputed, PropertiesDoc, () => "⚠️与properties字段重复⚠️">
//     & ValidationRepeated<TComputed, InheritDoc, "⚠️与inherit字段重复⚠️">
//     & ValidationOver<
//       GetStandard<TComputed>,
//       ComponentDoc["properties"],
//       `⚠️超出文档字段范围⚠️`
//     >
//     & IfExtends<
//       {},
//       ComponentDoc,
//       // 任意组件验证'all'字段
//       ValidatorOfPrefix<TComputed, Prefix, "all", false>,
//       IfExtends<
//         unknown,
//         ComponentDoc["properties"],
//         // 无properties组件验证'inner'字段
//         ValidatorOfPrefix<TComputed, Prefix, "inner", false>,
//         // 有properties组件验证'all'字段
//         & ValidatorOfPrefix<GetInner<TComputed>, Prefix, "inner", false>
//         // 超出字段验证
//         & ValidationOver<
//           GetStandard<TComputed>,
//           ComponentDoc["properties"],
//           `⚠️超出文档字段范围⚠️`
//         >
//         // 返回类型校验
//         & ValidatorOfReturnType<TComputed, ComponentDoc["properties"]>
//       >
//     >;
// }
// // 约束events
// & {
//   events?:
//     & TEvents
//     // 验证
//     & IfExtends<
//       {},
//       ComponentDoc,
//       & ValidationRepeatedInjectMethods<TEvents, "⚠️与注入的方法字段重复⚠️">
//       & ValidationRepeated<TEvents, Main["methods"], "⚠️与主方法字段重复⚠️">
//       & ValidationRepeated<TEvents, Main["events"], "⚠️与主事件字段重复⚠️">
//       & ValidationRepeated<TEvents, Main["customEvents"], "⚠️与主自定义事件字段重复⚠️">
//       & ValidatorOfPrefix<TEvents, Prefix, "standard">,
//       ValidationOver<
//         TEvents,
//         ComponentDoc["customEvents"],
//         () => `⚠️不存在的事件字段⚠️`
//       >
//     >;
// }
// // 提取TMethods
// & {
//   methods?:
//     & TMethod
//     // 验证
//     & ValidationRepeatedInjectMethods<TMethod, "⚠️与注入的方法字段重复⚠️">
//     & ValidationRepeated<TMethod, Main["methods"], "⚠️与主方法字段重复⚠️">
//     & ValidationRepeated<TMethod, Main["customEvents"], "⚠️与主自定义事件字段重复⚠️">
//     & ValidationRepeated<TMethod, Main["events"], "⚠️与主事件字段重复⚠️">
//     & ValidationRepeated<
//       TMethod,
//       IfEquals<TEvents, SubEventsConstraint<ComponentDoc>, unknown>,
//       "⚠️与事件字段重复⚠️"
//     >
//     & ValidatorOfPrefix<TMethod, Prefix, "all", false>
//     & IfExtends<
//       unknown,
//       ComponentDoc["customEvents"],
//       unknown,
//       ValidationRepeated<TMethod, ComponentDoc["customEvents"], "⚠️事件字段应写在events字段中⚠️">
//     >;
// }
// & // 官方OtherOption的属性 去掉pageLifeTimes
// Partial<Omit<WMCompOtherOption, "pageLifetimes" | "options" | "externalClasses" | "export">>
// & { pageLifetimes?: Partial<WMPageLifetimes> }
// & Partial<WechatMiniprogram.Component.Lifetimes>
// & {
//   watch?:
//     & WatchConstraint<
//       & PropertiesDoc
//       & ComputedDoc
//       & DataDoc
//       & Main["allData"]
//       & IfExtends<
//         unknown,
//         IinjectDataDoc<"返回函数字段">,
//         unknown,
//         ReturnFuncType<IinjectDataDoc<"返回函数字段"> & {}>
//       > // &{}因为 build时 报错
//     >
//     // 为了可以单独写计算属性而不报错
//     & Record<string, (newValue: unknown, oldValue: unknown) => void>;
// }
// & ThisType<
//   Instance<
//     TMethod,
//     DataWithoutFunc,
//     DataDoc,
//     DataFunc,
//     PropertiesDoc,
//     ComputedDoc,
//     Main["methods"],
//     Main["allData"],
//     Main["customEvents"]
//   >
// >;


type Constructor<
  TMainComponentDoc extends MainComponentDoc = {},
  TComponentDoc extends ComponentDoc = any,
  TPrefix extends string = "",
  CurrentPrefix extends string = IfEquals<
    TComponentDoc,
    any,
    TPrefix,
    `${ExtractDocPrefix<TComponentDoc>}${Capitalize<TPrefix>}`
  >,
  // 更新文档前缀为CurrentPrefix,TComponentDoc为any时 返回 {}
  CurrentComponentDoc extends ComponentDoc = ReplacePrefix<TComponentDoc, CurrentPrefix>,
> = {
  <
    Literal extends
      | string
      | number
      | boolean
      | Literal[]
      | Record<string, Literal>,
    // 如果有默认值 会导致无字段提示
    TProperties extends SubPropertiesConstraint<CurrentComponentDoc, Literal>,
  > // TInherit extends SubInheritConstraint<
  //   TMainComponentDoc["allData"],
  //   CurrentComponentDoc,
  //   PropertiesDoc
  // >,
  // TData extends SubDataConstraint<CurrentComponentDoc, PropertiesDoc & InheritDoc, CurrentPrefix>, // 有默认值 无提示
  // TEvents extends SubEventsConstraint<CurrentComponentDoc>,
  // TComputed extends ComputedConstraint = {}, // 必须加默认值 内部二次使用泛型逻辑导致
  // TMethod extends MethodsConstraint = {}, // 为了方便验证加默认值
  // PropertiesDoc = IfEquals<
  //   TProperties,
  //   SubPropertiesConstraint<CurrentComponentDoc, Literal>,
  //   unknown,
  //   GetPropertiesDoc<Cast<TProperties, PropertiesConstraint>>
  // >,
  // InheritDoc = IfEquals<
  //   TInherit,
  //   SubInheritConstraint<
  //     TMainComponentDoc["allData"],
  //     CurrentComponentDoc,
  //     PropertiesDoc
  //   >
  // >,
  // DataDoc = IfEquals<
  //   TData,
  //   SubDataConstraint<CurrentComponentDoc, PropertiesDoc & InheritDoc, CurrentPrefix>,
  //   unknown,
  //   GetDataDoc<TData, CurrentComponentDoc["properties"] & {}>
  // >,
  // // 去除前缀的自定义事件
  // NoPrefixCustomEvents extends object = RemovePrefix<CurrentComponentDoc["customEvents"] & {}>,
  // // 提取主组件自定义事件 与 去除前缀的穿透自定义事件 相同的字段 用于报错
  // RepeatedFieldsOfCustomEvents extends string = Extract<
  //   keyof TMainComponentDoc["customEvents"] & string,
  //   keyof NoPrefixCustomEvents
  // >,
  // // 有多次相同需求，避免重复计算
  // AllData =
  //   & GetComputedDoc<TComputed>
  //   & DataDoc
  //   & PropertiesDoc
  //   & InheritDoc,
  // // 缺少的必选properties字段
  // MissingPropertiesRequiredFields = Exclude<
  //   RequiredKeys<CurrentComponentDoc["properties"] & {}>,
  //   keyof AllData
  // >,
  (
    options: Options<
      TMainComponentDoc,
      // CurrentComponentDoc,
      CurrentPrefix,
      TProperties
    >, // PropertiesDoc,
    // TData,
    // TEvents,
    // TComputed,
    // TMethod,
    // TInherit,
    // CurrentPrefix,
    // DataDoc,
    // InheritDoc
  ): // 重复事件检测和必传properties检测通过创建SubComponentDoc
  CurrentPrefix;
  //   IfExtends<
  //     [RepeatedFieldsOfCustomEvents],
  //     [never],
  //     IfExtends<
  //       unknown,
  //       TComponentDoc["properties"],
  //       // 传入无properties不检测
  //       CreateSubComponentDoc<
  //         TComponentDoc["customEvents"] & {},
  //         PropertiesDoc
  //       >,
  //       // 检测是否缺少必传的properties字段
  //       IfExtends<
  //         [
  //           MissingPropertiesRequiredFields,
  //         ],
  //         [never],
  //         CreateSubComponentDoc<
  //           TComponentDoc["customEvents"] & {},
  //           PropertiesDoc
  //         >,
  //         `缺少组件必传字段 ${Join<Cast<ListOf<MissingPropertiesRequiredFields>, string[]>, ",">}`
  //       >
  //     >,
  //     `⚠️主自定义事件与子组件穿透事件命名冲突 ${RepeatedFieldsOfCustomEvents} ⚠️`
  //   >;
};

// type CreateSubComponentDoc<
//   inputCustomEvents extends ICustomEventDoc,
//   PropertiesDoc,
//   ComposedEvents = ComputeObj<GetComposedEventsAndRemovePrefix<inputCustomEvents>>,
//   Result =
//     & IfExtends<{}, ComposedEvents, unknown, { customEvents: ComposedEvents }>
//     & IfExtends<
//       unknown,
//       PropertiesDoc,
//       unknown,
//       { properties: { [k in keyof PropertiesDoc]: PuerObjectAddNull<PropertiesDoc[k]> } }
//     >,
// > = unknown extends Result ? never : Result;

/**

   * 建立子组件
   * @param TMainComponentDoc  主组件文档类型
   * @param TComponentDoc 引入的子组件文档类型
   * @returns SubComponentDoc
   */
export function SubComponent<
  TMainComponentDoc extends MainComponentDoc = {},
  TComponentDoc extends ComponentDoc = any,
  TPrefix extends string = "",
>(): IfEquals<
  // Doc为空对象时
  {},
  TComponentDoc,
  (options: EmptyObject) => {},
  // Doc不为空对象时
  Constructor<TMainComponentDoc, TComponentDoc, TPrefix>
> {
  return (options: any) => options;
}

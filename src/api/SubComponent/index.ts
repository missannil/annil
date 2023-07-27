import type { As } from "hry-types/src/Any/As";
import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentDoc } from "../../types/ComponentDoc";
import type { ExtractDocPrefix } from "../../types/GetComponentPrefix";
import type { MainComponentDoc } from "../../types/MainComponentDoc";
import type { ReplacePrefix } from "../../types/ReplacePrefix";
import type { GetDataDoc } from "../MainComponent/Data/GetDataDoc";
import type { GetPropertiesDoc } from "../MainComponent/Properties/GetPropertiesDoc";
import type { PropertiesConstraint } from "../MainComponent/Properties/PropertiesConstraint";
import type { SubComputed } from "./SubComputed";
import type { GetSubComputedDoc } from "./SubComputed/GetSUbComputedDoc";
import type { SubComponentConstraint } from "./SubComputed/SubComputedConstraint";
import type { SubData } from "./SubData";
import type { SubDataConstraint } from "./SubData/SubDataConstraint";
import type { SubEvents } from "./SubEvents";
import type { SubEventsConstraint } from "./SubEvents/SubEventsConstraint";
import type { SubProperties } from "./SubProperties";
import type { SubPropertiesConstraint } from "./SubProperties/SubPropertiesConstraint";

type Options<
  TMainComponentDoc extends MainComponentDoc,
  CurrentComponentDoc extends ComponentDoc,
  CurrentPrefix extends string,
  TSubProperties extends object,
  TSubData extends object,
  TSubComputed extends object,
  TEvents extends object,
  SubPropertiesDoc extends object,
  SubDataDoc extends object,
  SubComputedDoc extends object,
> =
  & SubProperties<TSubProperties, CurrentPrefix, TMainComponentDoc>
  & SubData<TSubData, CurrentPrefix, keyof (TMainComponentDoc["allData"] & SubPropertiesDoc)>
  & SubComputed<
    TSubComputed,
    CurrentPrefix,
    TMainComponentDoc["allData"] & Required<SubPropertiesDoc> & SubDataDoc,
    CurrentComponentDoc["properties"] & {},
    SubComputedDoc
  >
  & SubEvents<TEvents, TMainComponentDoc>;

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
    TSubProperties extends SubPropertiesConstraint<CurrentComponentDoc, Literal>,
    // 有默认值 无提示
    TSubData extends SubDataConstraint<CurrentComponentDoc, keyof SubPropertiesDoc>,
    //
    TEvents extends SubEventsConstraint<CurrentComponentDoc>,
    // 必须加默认值
    TSubComputed extends SubComponentConstraint<CurrentComponentDoc, keyof (SubPropertiesDoc & SubDataDoc)> = {},
    SubPropertiesDoc extends object = IfExtends<
      SubPropertiesConstraint<CurrentComponentDoc, Literal>,
      TSubProperties,
      {},
      GetPropertiesDoc<As<TSubProperties, PropertiesConstraint>>
    >,
    SubDataDoc extends object = IfEquals<
      TSubData,
      SubDataConstraint<CurrentComponentDoc, keyof SubPropertiesDoc>,
      {},
      GetDataDoc<TSubData>
    >,
    SubComputedDoc extends object = GetSubComputedDoc<TSubComputed>,
  >(
    options: Options<
      TMainComponentDoc,
      CurrentComponentDoc,
      CurrentPrefix,
      TSubProperties,
      TSubData,
      TSubComputed,
      TEvents,
      SubPropertiesDoc,
      SubDataDoc,
      SubComputedDoc
    >,
  ): SubComputedDoc;
};

/**
 * 子组件构建函数
 * @param TMainComponentDoc - 主组件文档类型
 * @param TComponentDoc - 引入的子组件文档类型
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

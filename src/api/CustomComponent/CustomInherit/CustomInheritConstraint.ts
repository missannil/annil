import type { SelectKeys } from "hry-types/src/Object/_api";
import type { RemoveInnerData } from "../../../types/RemoveInnerData";
import type { ComponentType } from "../../DefineComponent/ReturnType/ComponentType";

type WXMLSign = "wxml";

type unionAddList<Keys extends string> = Keys | Keys[];

/**
 * 子组件inherit字段约束,key为构建组件所需的properties字段,类型为根组件数据的key或key[]或`WXMLSign`。要求根数据类型为子数据类型的子类型。当key的值来自wxml(循环产生的子数据等情况)时用`WXMLSign`表示。
 * @returns object
 */
export type CustomInheritConstraint<AllRootData extends object, TComponentDoc extends ComponentType> = {
  [k in keyof TComponentDoc["properties"]]?:
    | unionAddList<RemoveInnerData<SelectKeys<AllRootData, TComponentDoc["properties"][k]> & string>>
    | WXMLSign;
};

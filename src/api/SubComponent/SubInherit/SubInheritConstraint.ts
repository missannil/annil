import type { SelectKeys } from "hry-types/src/Object/_api";
import type { RemoveInnerData } from "../../../types/RemoveInnerData";
import type { ComponentDoc } from "../../DefineComponent/ReturnType/ComponentDoc";

type WXMLSign = "wxml";

/**
 * 子组件inherit字段约束,key为构建组件所需的properties字段,类型为根组件数据的key或`WXMLSign`。要求根数据类型为子数据类型的子类型。当key的值来自wxml(循环产生的子数据等情况)时用`WXMLSign`表示。
 * @returns object
 */
export type InheritConstraint<AllRootData extends object, TComponentDoc extends ComponentDoc> = {
  [k in keyof TComponentDoc["properties"]]?:
    | RemoveInnerData<SelectKeys<AllRootData, TComponentDoc["properties"][k]> & string>
    | WXMLSign;
};

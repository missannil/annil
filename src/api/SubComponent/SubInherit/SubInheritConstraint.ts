import type { SelectKeys } from "hry-types/src/Object/_api";
import type { ComponentDoc } from "../../DefineComponent/ReturnType/ComponentDoc";

type WXMLSign = "wxml";

/**
 * 子组件inherit字段约束,
 * @returns object
 */
export type InheritConstraint<RootData extends object, TComponentDoc extends ComponentDoc> = {
  [k in keyof TComponentDoc["properties"]]?: SelectKeys<RootData, TComponentDoc["properties"][k]> | WXMLSign;
};

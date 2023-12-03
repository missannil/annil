import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { ComponentDoc } from "../api/DefineComponent/ReturnType/ComponentDoc";
import type { GetComponentPrefix } from "./GetComponentPrefix";

type Validator<
  TOriginalComponentDoc extends ComponentDoc,
  TExtensionDoc extends ComponentDoc,
  TOriginalPrefix extends PropertyKey = GetComponentPrefix<TOriginalComponentDoc>,
  TExtenstionPrefix extends PropertyKey = GetComponentPrefix<TExtensionDoc>,
  DuplicateKeys extends PropertyKey =
    | Extract<keyof TExtensionDoc["properties"], keyof TOriginalComponentDoc["properties"]>
    | Extract<keyof TExtensionDoc["customEvents"], keyof TOriginalComponentDoc["customEvents"]>,
> = IfExtends<
  TOriginalPrefix,
  TExtenstionPrefix,
  IfExtends<DuplicateKeys, never, ComponentDoc, `${DuplicateKeys & string}字段重复`>,
  `前缀错误,应为${TOriginalPrefix & string}`
>;

/**
 * 有时组件文档内部包含一些slot或基本组件,可通过CompDocExtends泛型拓展组件文档,使得类型更安全
 */
export type ComponentDocExtension<
  TOriginalComponentDoc extends ComponentDoc,
  // @ts-ignore
  TExtensionDoc extends Validator<TOriginalComponentDoc, TExtensionDoc>,
> = ComputeIntersectionDeep<TOriginalComponentDoc & TExtensionDoc>;

// type test0 = ComponentDocExtension<{ properties: { aaa_xxx: string } }, { properties: { aaa_xxx: string } }>; // => "aaa_xxx字段重复"

// type test1 = ComponentDocExtension<{ customEvents: { aaa_xxx: string } }, { customEvents: { aaa_xxx: string } }>; // => "aaa_xxx字段重复"

// type test2 = ComponentDocExtension<{ properties: { aaa_xxx: string } }, { properties: { ddd_xxx: string } }>; // => "前缀错误,应为aaa"

// type test3 = ComponentDocExtension<{ customEvents: { aaa_xxx: string } }, { customEvents: { ddd_xxx: string } }>; // => "前缀错误,应为aaa"

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { ComponentType } from "../api/DefineComponent/ReturnType/ComponentType";
import type { GetComponentPrefix } from "./GetComponentPrefix";

type Validator<
  TOriginalComponentType extends ComponentType,
  TExtensionType extends ComponentType,
  TOriginalPrefix extends PropertyKey = GetComponentPrefix<TOriginalComponentType>,
  TExtenstionPrefix extends PropertyKey = GetComponentPrefix<TExtensionType>,
  DuplicateKeys extends PropertyKey =
    | Extract<keyof TExtensionType["properties"], keyof TOriginalComponentType["properties"]>
    | Extract<keyof TExtensionType["customEvents"], keyof TOriginalComponentType["customEvents"]>,
> = IfExtends<
  TOriginalPrefix,
  TExtenstionPrefix,
  IfExtends<DuplicateKeys, never, ComponentType, `${DuplicateKeys & string}字段重复`>,
  `前缀错误,应为${TOriginalPrefix & string}`
>;

/**
 * 有时组件文档内部包含一些slot或基本组件,可通过ExtendComponentType泛型拓展组件类型
 */
export type ExtendComponentType<
  TOriginalComponentType extends ComponentType,
  // @ts-ignore
  TExtensionType extends Validator<TOriginalComponentType, TExtensionType>,
> = ComputeIntersectionDeep<TOriginalComponentType & TExtensionType>;

// type test0 = ExtendComponentType<{ properties: { aaa_xxx: string } }, { properties: { aaa_xxx: string } }>; // => "aaa_xxx字段重复"

// type test1 = ExtendComponentType<{ customEvents: { aaa_xxx: string } }, { customEvents: { aaa_xxx: string } }>; // => "aaa_xxx字段重复"

// type test2 = ExtendComponentType<{ properties: { aaa_xxx: string } }, { properties: { ddd_xxx: string } }>; // => "前缀错误,应为aaa"

// type test3 = ExtendComponentType<{ customEvents: { aaa_xxx: string } }, { customEvents: { ddd_xxx: string } }>; // => "前缀错误,应为aaa"

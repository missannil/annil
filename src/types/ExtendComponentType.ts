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
 * 拓展组件类型
 * @param TOriginalComponentType 原始组件类型
 * @param TExtensionType 拓展类型
 * @description 拓展类型必须与原始类型有相同的前缀
 * @example
 * ```ts
 * type $CustomA = ExtendComponentType<
 *  { properties: { aaa_num: number };
 *   customEvents: { aaa_xxx: string }
 *  },
 *  { properties: { aaa_str: string };
 *   customEvents: { aaa_yyy: string }
 * }>;
 *
 * // 等同下面的类型
 *  type $CustomA = {
 *    properties: {
 *      aaa_num: number;
 *      aaa_str: string;
 *    };
 *    customEvents: {
 *      aaa_xxx: string;
 *      aaa_yyy: string;
 *    };
 * ```
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

import type { Func } from "hry-types/src/Misc/Func";
import type { WMCompPageLifetimes, WMPageLifetimes } from "../../types/OfficialTypeAlias";
import type { LifetimesConstraint } from "./Lifetimes/LifetimesConstraint";

type _RootComponentDoc = {
  isPage?: boolean;
  properties?: object;
  data?: object;
  computed?: object;
  customEvents?: object;
  methods?: object;
  events?: object;
  store?: object;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: Func }>;
  externalClasses?: string[];
};

// 验证key是否合法
type _Validator<O, Doc, ErrKeys = Exclude<keyof O, keyof Doc>> = [ErrKeys] extends [never] ? Doc
  : `错误的字段${ErrKeys & string}`;

/**
 * RootComponent Api 返回的类型
 * ```ts
 * RootComponentDoc = {
 * isPage?: true;
 * properties?: object;
 * data?: object;
 * store?:object;
 * computed?: object;
 * customEvents?: object;
 * methods?: object;
 * events?: object;
 * };
 * ```
 */
export type RootComponentDoc<O extends _Validator<O, _RootComponentDoc> = _RootComponentDoc> = O;

type _RootPageDoc = {
  isPage?: boolean;
  properties?: object;
  data?: object;
  computed?: object;
  customEvents?: object;
  methods?: object;
  events?: object;
  store?: object;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?: Partial<WMPageLifetimes>;
};

export type RootPageDoc<O extends _Validator<O, _RootPageDoc> = _RootPageDoc> = O;

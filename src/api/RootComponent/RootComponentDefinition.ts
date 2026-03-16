import type { WMCompPageLifetimes, WMPageLifetimes } from "../../types/OfficialTypeAlias";
import type { LifetimesConstraint } from "./Lifetimes/LifetimesConstraint";

type _RootComponentDefinition = {
  isPage?: boolean;
  properties?: object;
  data?: object;
  computed?: object;
  customEvents?: object;
  methods?: object;
  events?: object;
  store?: object;
  watch?: Record<string, AnyFunction>;
  lifetimes?: LifetimesConstraint;
  pageLifetimes?: Partial<WMCompPageLifetimes & { load: AnyFunction }> | Partial<WMPageLifetimes>;
  externalClasses?: string[];
  export?: () => void; // behaviors 'wx://component-export' 使用
};

// 验证key是否合法
type _Validator<O, Doc, ErrKeys = Exclude<keyof O, keyof Doc>> = [ErrKeys] extends [never] ? Doc
  : `错误的字段${ErrKeys & string}`;

/**
 * RootComponent Api 的返回类型
 */
export type RootComponentDefinition<O extends _Validator<O, _RootComponentDefinition> = _RootComponentDefinition> = O;

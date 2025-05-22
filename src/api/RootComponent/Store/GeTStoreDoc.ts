import type { ParamsEqual } from "../../../types/TwoParamsEqual";
import type { Getter } from "./StoreConstraint";

type UndefinedToNull<T> = T extends undefined ? null : T;

// 单独Getter类型返回值会把undefined转换为null
// 但是WithDefault类型返回值为getter的返回值去除undefined和default的类型联合。
export type GetStoreDoc<TStore extends object> = {
  [k in keyof TStore]: TStore[k] extends Getter ? UndefinedToNull<ReturnType<TStore[k]>>
    : TStore[k] extends {
      getter: () => infer R;
      default: infer D;
    } ? Exclude<R, undefined> | D
    : never;
};
type User = { name: string; age: number };
type test = GetStoreDoc<{
  userName: () => string;
  userAge: () => number;
  userInfo: {
    getter: () => User | undefined;
    default: null;
  };
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type test1 = ParamsEqual<
  test,
  {
    userName: string;
    userAge: number;
    userInfo: User | null;
  }
>;

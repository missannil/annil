import type { ParamsEqual } from "../../../types/TwoParamsEqual";
import type { Getter } from "./StoreConstraint";
// 单独Getter类型返回值会把undefined转换为null
// 但是WithDefault类型返回值为getter的返回值去除undefined和default的类型联合。
export type GetStoreDoc<TStore extends object> = {
  [k in keyof TStore]: TStore[k] extends Getter ? ReturnType<TStore[k]>
    : TStore[k] extends {
      getter: (...args: unknown[]) => infer R;
      default: infer D;
    } ? Exclude<R, undefined> | (D extends null ? null : never)
    : never;
};

// test
type User = { name: string; age: number };
type test = GetStoreDoc<{
  userName: (data: { aaa: "string" }) => string;
  userAge: (data: { aaa: "string" }) => number;
  userInfo: {
    getter: (data: { aaa: "string" }) => User | undefined;
    default: null;
  };
  list: {
    getter: (data: { aaa: "string" }) => User[] | undefined;
    default: [];
  };
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type test1 = ParamsEqual<
  test,
  {
    userName: string;
    userAge: number;
    userInfo: User | null;
    list: User[];
  }
>;

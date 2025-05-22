import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IsPureObject } from "hry-types/src/Any/IsPureObject";
import type { NoInfer } from "hry-types/src/Generic/NoInfer";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";

type getFirstKeys<T extends string> = T extends `${infer F}.${string}` ? F : never;

type getLastKeys<T extends string> = T extends `${string}.${infer L}` ? L : never;

// 加入对象字段一级key 例如 `obj.xxx`(newValue,oldValue){...}和`obj.**`
type AddFieldsOfObject<
  TWatchData extends object,
  _WatchKeys extends keyof TWatchData,
  secondKeys extends string = {
    [k in _WatchKeys]: IsPureObject<TWatchData[k]> extends true
      ? `${k & string}.${(keyof TWatchData[k]) & string}` | `${k & string}.**`
      : never;
  }[_WatchKeys],
> = {
  [k in secondKeys]?: (
    // @ts-ignore
    newValue: IfExtends<
      getLastKeys<k>,
      "**",
      // @ts-ignore
      Exclude<TWatchData[getFirstKeys<k>], null>,
      // @ts-ignore
      NonNullable<(Exclude<TWatchData[getFirstKeys<k>], null>)[getLastKeys<k>]>
    >,
    oldValue: IfExtends<
      getLastKeys<k>,
      "**",
      // @ts-ignore
      TWatchData[getFirstKeys<k>],
      // @ts-ignore
      (Exclude<TWatchData[getFirstKeys<k>], null>)[getLastKeys<k>]
    >,
  ) => void | Promise<void>;
};

export type WatchOption<TWatchData extends object, _WatchKeys extends keyof TWatchData = keyof TWatchData> = {
  /**
   * 监控所有data字段,值变化时(JSON.stringify判断)运行watch函数,一参为最新值,二参为变化前值。
   * 对象数据可通过`obj.xxx:`监控具体字段(只加入了一级字段类型提示)
   */
  watch?: IfExtends<
    {},
    TWatchData,
    EmptyObject,
    // 不加NoInfer会导致只监控计算字段时错误
    NoInfer<
      & {
        [k in _WatchKeys]?: (
          newValue: TWatchData[k],
          oldValue: TWatchData[k],
        ) => void | Promise<void>;
      }
      // 解决单独书写计算书写字段的报错(猜测是:ts字面量约束检测提前计算属性key引起的错误提示)
      // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
      & {
        [k in _WatchKeys as never]: unknown;
      }
      // 加入对象的一级字段类型提示
      & AddFieldsOfObject<TWatchData, _WatchKeys>
    >
  >;
};

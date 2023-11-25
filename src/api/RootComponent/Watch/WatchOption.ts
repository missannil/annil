import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IsPureObject } from "hry-types/src/Any/IsPureObject";
import type { NoInfer } from "hry-types/src/Generic/NoInfer";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";

type getFirstKeys<T extends string> = T extends `${infer F}.${string}` ? F : never;

type getLastKeys<T extends string> = T extends `${string}.${infer L}` ? L : never;

// 加入对象字段一级key 例如 `obj.xxx`(newValue,oldValue){...}
type AddFieldsOfObject<
  TWatchData extends object,
  _WatchKeys extends keyof TWatchData,
  secondKeys extends string = {
    [k in _WatchKeys]: IsPureObject<Exclude<TWatchData[k], null>> extends true
      ? `${k & string}.${(keyof Exclude<TWatchData[k], null>) & string}`
      : never;
  }[_WatchKeys],
> =
  & {
    // 添加对象类型.keys
    [
      k in _WatchKeys as IsPureObject<Exclude<TWatchData[k], null>> extends true
        ? `${k & string}.${(keyof Exclude<TWatchData[k], null>) & string}`
        : never
    ]?: unknown;
  }
  & {
    [k in secondKeys]?: (
      // @ts-ignore
      newValue: ReadonlyDeep<(Exclude<TWatchData[getFirstKeys<k>], null>)[getLastKeys<k>] & {}>,
      // @ts-ignore
      oldValue: ReadonlyDeep<(Exclude<TWatchData[getFirstKeys<k>], null>)[getLastKeys<k>]>,
    ) => void;
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
          // newValue 去除null 深度只读
          newValue: ReadonlyDeep<Exclude<TWatchData[k], null>>,
          oldValue: ReadonlyDeep<TWatchData[k]>,
        ) => void;
      }
      // 解决单独书写计算书写字段的报错(猜测是:ts字面量约束检测提前计算属性key引起的错误提示)
      & {
        [k in _WatchKeys as never]: unknown;
      }
      // 加入对象的一级字段类型提示
      & AddFieldsOfObject<TWatchData, _WatchKeys>
    >
  >;
};

import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { AddNullForObject } from "../../../types/AddNullForObject";
import type { RootComponentType } from "../../RootComponent/RootComponentType";
import type { SubComponentType } from "../../SubComponent/SubComponentType";
import type { GetCustomEventDocOfSubDoc } from "./GetCustomEventDocOfSubDoc";

// 获取RootComponetDoc中events字段类型阻止事件(后最为catch)的key `${ 组件前缀 }_${infer Key}_${ bubbles | capture }_catch`
type GetStopKeys<O> = { [k in keyof O]: k extends `${string}_${infer Key}_${string}_catch` ? Key : never }[keyof O];

export type CreateComponentDoc<
  TRootDoc extends RootComponentType,
  TName extends string,
  TSubComponentTuple extends SubComponentType[],
  // 获取RootDoc和SubComponent[]中所有的properties字段类型
  AllPropertiesDoc extends unknown | object = TRootDoc["properties"],
  AllCustomEventsDoc extends unknown | object =
    & TRootDoc["customEvents"]
    & GetCustomEventDocOfSubDoc<TSubComponentTuple[number]>,
  StopKeys extends string = GetStopKeys<TRootDoc["events"]>,
  FinalCustomEventDoc extends object = Omit<AllCustomEventsDoc, StopKeys>,
> = ComputeIntersection<
  & IfExtends<
    unknown,
    AllPropertiesDoc,
    {},
    {
      properties: {
        // AddNullForObject 为了给子组件传值时,可以让异步对象数据初始值为null。
        [k in keyof AllPropertiesDoc as `${TName}_${k & string}`]: AddNullForObject<
          AllPropertiesDoc[k]
        >;
      };
    }
  >
  & IfExtends<
    {},
    FinalCustomEventDoc,
    {},
    {
      customEvents: {
        [k in keyof FinalCustomEventDoc as `${TName}_${k & string}`]: FinalCustomEventDoc[k];
      };
    }
  >
>;

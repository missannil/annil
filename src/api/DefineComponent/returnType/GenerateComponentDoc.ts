import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { CustomComponentDefinition } from "../../CustomComponent/returnType";
import type { RootComponentDefinition } from "../../RootComponent/returnType";
import type { GetCustomEventDocOfSubDoc } from "./GetCustomEventDocOfSubDoc";

// 获取RootComponetDoc中events字段类型阻止事件(后最为catch)的key `${ 组件前缀 }_${infer Key}_${ bubbles | capture }_catch`
type GetStopKeys<O> = { [k in keyof O]: k extends `${string}_${infer Key}_${string}_catch` ? Key : never }[keyof O];

/**
 * 生成组件文档类型
 */
export type GenerateComponentDoc<
  TRootDoc extends RootComponentDefinition,
  TName extends string,
  TSubComponentTuple extends CustomComponentDefinition[],
  // 获取RootDoc和SubComponent[]中所有的properties字段类型
  AllPropertiesDoc extends unknown | object = TRootDoc["properties"],
  AllEventsDoc extends unknown | object =
    & TRootDoc["customEvents"]
    & GetCustomEventDocOfSubDoc<TSubComponentTuple[number]>,
  StopKeys extends string = GetStopKeys<TRootDoc["events"]>,
  FinalEventsDoc extends object = Omit<AllEventsDoc, StopKeys>,
> = ComputeIntersection<
  & IfExtends<
    unknown,
    AllPropertiesDoc,
    {},
    {
      properties: {
        // AddNullForObject 为了给子组件传值时,可以让异步对象数据初始值为null。
        [k in keyof AllPropertiesDoc as `${TName}_${k & string}`]: AllPropertiesDoc[k];
      };
    }
  >
  & IfExtends<
    {},
    FinalEventsDoc,
    {},
    {
      events: {
        [k in keyof FinalEventsDoc as `${TName}_${k & string}`]: FinalEventsDoc[k];
      };
    }
  >
>;

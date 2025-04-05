import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComputeIntersection, Select } from "hry-types/src/Object/_api";
import type { ComputeObject } from "../../../types/ComputeObj";
import type { RemovePrefix } from "../../../types/RemovePrefix";
import type { Composed } from "../../RootComponent/CustomEvents/CustomEventsTag";

type SelectStopEvents<T extends object> = {
  [k in keyof T as k extends `${infer R}_catch` ? R : never]: unknown;
};

type GetComposedEvents<
  TCustomEventsDoc extends object,
> = Select<
  TCustomEventsDoc,
  Composed,
  "contains->"
>;

export type CreatCustomComponentDoc<
  ComponentCustomEvents extends object,
  SubEventsDoc extends object,
  // allDatas extends object,
  // SubMethods extends object,
  ComposedEvents extends object = ComputeObject<
    RemovePrefix<
      Omit<
        GetComposedEvents<ComponentCustomEvents>,
        keyof SelectStopEvents<SubEventsDoc>
      >
    >
  >,
  SubCompDoc = ComputeIntersection<
    // 1. 从原始组件文档中排除子组件文档中的事件
    IfExtends<EmptyObject, ComposedEvents, {}, { composedEvents: ComposedEvents }>
  >, // & IfExtends<EmptyObject, SubMethods, {}, { methods: SubMethods }>
> // & IfExtends<EmptyObject, allDatas, {}, { allDatas: allDatas }>
 =
  // SubComponent中计算属性字段函数若不写返回类型,可能会造成结果中没有计算属性字段类型,若没有其他字段,结果就为'{}',如果加入到DefineComponent的subComponents字段中会引起本来应该报错的组件(例如:'aaa组件缺少xxx必传字段')不报错。所以这里把结果为{}的情况替换为never。可以让组件类型为字符串时报错。
  // & IfExtends<EmptyObject, SubEventsDoc, {}, { events: SubEventsDoc }>
  IfExtends<EmptyObject, SubCompDoc, never, SubCompDoc>;

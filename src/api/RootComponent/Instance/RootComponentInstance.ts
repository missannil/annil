import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IReactionDisposer } from "mobx";

import type { Func } from "hry-types/src/Misc/Func";
import type { Assign } from "../../../types/Assign";
import type { ComputeObject } from "../../../types/ComputeObj";
import type { WMComponentInstance, WMInstanceMethods, WMPageInstance } from "../../../types/OfficialTypeAlias";
import type { OptionsInnerFields } from "../../DefineComponent/normalizeOptions";
import type { IInjectAllData, IInjectMethods } from "../../InstanceInject/instanceConfig";
import type { CustomEventMethods } from "./CustomEventMethods";
import type { CustomSetData } from "./CustomSetData";
export type RootComponentInstance<
  TIsPage extends boolean,
  TMethods extends object,
  TDataForSetData extends object,
  AllData extends object,
  CustomEventsDoc extends object,
  StoreDoc extends object,
  instanceData = ComputeObject<Assign<IInjectAllData, ComputeIntersection<AllData>>>,
> =
  // 官方实例属性is  options  dataset等
  & IfExtends<false, TIsPage, WMComponentInstance, WMPageInstance>
  // 官方实例方法去除setData,因其类型宽泛
  & Omit<WMInstanceMethods<{}>, "setData">
  // 加入自定义setData方法
  & CustomSetData<TDataForSetData>
  & IfExtends<{}, StoreDoc, unknown, {
    disposer: { [k in keyof StoreDoc]: IReactionDisposer };
  }>
  & Assign<IInjectMethods, TMethods & CustomEventMethods<CustomEventsDoc>>
  & { data: instanceData };
// & { cloneData: ComputeObject<Assign<IInjectData, ComputeIntersection<AllData>>> };

export type ComponentInstance = RootComponentInstance<false, {}, {}, {}, {}, {}>;

export type PageInstance = RootComponentInstance<true, {}, {}, {}, {}, {}>;

type InstanceInnerFields = {
  data: OptionsInnerFields["data"];
  disposer: Record<string, Func>;
  cloneData: OptionsInnerFields["data"];
} & OptionsInnerFields["methods"];
export type Instance = (ComponentInstance | PageInstance) & InstanceInnerFields;

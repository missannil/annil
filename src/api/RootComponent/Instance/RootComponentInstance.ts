import type { IReactionDisposer } from "mobx";
import type { IfExtends } from "../../../types/IfExtends";

import type { EmptyObject, Func } from "hry-types";
import type { Assign } from "../../../types/Assign";

import type { _SimplifyIntersection } from "hry-types";
import type { WMComponentInstance, WMInstanceMethods, WMPageInstance } from "../../../types/OfficialTypeAlias";
import type { Simplify } from "../../../types/Simplify";
import type { OptionsInnerFields } from "../../DefineComponent/normalizeOptions";
import type { IInjectAllData, IInjectMethods } from "../../InstanceInject/instanceConfig";
import type { generateCustomEventMethods } from "./CustomEventMethods";
import type { CustomSetData } from "./CustomSetData";
export type RootComponentInstance<
  TIsPage extends boolean,
  TMethods extends object,
  TDataForSetData extends object,
  AllData extends object,
  CustomEventsDef extends object,
  StoreDoc extends object,
  instanceData = Simplify<Assign<IInjectAllData, _SimplifyIntersection<AllData>>>,
> =
  // 官方实例属性is  options  dataset等
  & IfExtends<false, TIsPage, WMComponentInstance, WMPageInstance>
  // 官方实例方法去除setData,因其类型宽泛
  & Omit<WMInstanceMethods<{}>, "setData">
  // 加入自定义setData方法
  & CustomSetData<TDataForSetData>
  & IfExtends<EmptyObject, StoreDoc, unknown, {
    disposer: { [k in keyof StoreDoc]: IReactionDisposer };
  }>
  // 自身methods覆盖注入的methods
  & Assign<IInjectMethods, TMethods & generateCustomEventMethods<CustomEventsDef>>
  & { data: instanceData };

export type ComponentInstance = RootComponentInstance<false, {}, {}, {}, {}, {}>;

export type PageInstance = RootComponentInstance<true, {}, {}, {}, {}, {}>;

type InstanceInnerFields = {
  data: OptionsInnerFields["data"];
  disposer: Record<string, Func>;
  cloneData: OptionsInnerFields["data"];
};
export type Instance = (ComponentInstance | PageInstance) & InstanceInnerFields;

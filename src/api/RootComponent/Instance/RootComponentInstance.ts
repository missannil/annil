import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Func } from "hry-types/src/Misc/Func";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IReactionDisposer } from "mobx";
import type { WMInstanceMethods } from "../../../types/officialAlias";
import type { WMComponentInstance, WMPageInstance } from "../../../types/officialCorrelation";
import type { CustomEventMethods } from "./CustomEventMethods";
import type { CustomSetData } from "./CustomSetData";
export type RootComponentInstance<
  TIsPage extends boolean,
  TMethods extends object,
  TData extends object,
  AllData extends object,
  CustomEventsDoc extends object,
  StateDoc extends object,
> =
  // 官方实例属性is  options  dataset等
  & IfExtends<false, TIsPage, WMComponentInstance, WMPageInstance>
  // 官方实例方法去除setData,因其类型宽泛
  & Omit<WMInstanceMethods<{}>, "setData">
  // 加入自定义setData方法
  & CustomSetData<TData>
  & IfExtends<{}, StateDoc, unknown, {
    disposer?: { [k in keyof StateDoc]: IReactionDisposer };
    applySetData: Func;
  }>
  & TMethods
  & CustomEventMethods<CustomEventsDoc>
  & { data: ReadonlyDeep<ComputeIntersection<AllData>> };

export type ComponentInstance = RootComponentInstance<false, {}, {}, {}, {}, {}>;

export type PageInstance = RootComponentInstance<true, {}, {}, {}, {}, {}>;

import type { O } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IReactionDisposer } from "mobx";
import type { WMInstanceMethods, WMInstanceProperties } from "../../../types/officialAlias";
import type { GetDataDoc } from "../Data/GetDataDoc";
import type { CustomEventMethods } from "./CustomEventMethods";
import type { CustomSetData } from "./CustomSetData";

export type RootComponentInstance<
  TMethods,
  TData extends object,
  AllData extends object,
  CustomEventsDoc extends object,
  ResponsiveData = GetDataDoc<TData, "返回函数字段">,
> =
  // 官方实例属性is  options  dataset等
  & WMInstanceProperties
  // 官方实例方法去除setData,因其类型宽泛
  & Omit<WMInstanceMethods<{}>, "setData">
  // 加入自定义setData方法
  & CustomSetData<GetDataDoc<TData, "去掉函数字段">>
  & IfExtends<
    {},
    ResponsiveData,
    unknown,
    {
      __disposer: { [k in keyof ResponsiveData]: IReactionDisposer };
      _applySetData: (callback?: Function) => void;
    }
  >
  & TMethods
  & CustomEventMethods<CustomEventsDoc>
  & { data: ReadonlyDeep<O.ComputeIntersection<AllData>> };

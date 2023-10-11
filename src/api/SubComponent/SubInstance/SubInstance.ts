import type { IfExtends } from "hry-types/src/Any/IfExtends";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { IReactionDisposer } from "mobx";
import type { WMInstanceMethods, WMInstanceProperties } from "../../../types/officialAlias";
import type { GetDataDoc } from "../../RootComponent/Data/GetDataDoc";
import type { CustomEventMethods } from "../../RootComponent/Instance/CustomEventMethods";
import type { CustomSetData } from "../../RootComponent/Instance/CustomSetData";

export type SubInstance<
  TAllMethods,
  TData extends object,
  AllData extends object,
  AllCustomEventsDoc extends object,
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
  & TAllMethods
  & CustomEventMethods<AllCustomEventsDoc>
  & { data: ReadonlyDeep<ComputeIntersection<AllData>> };

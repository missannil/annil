import { DefineComponent } from "./api/DefineComponent";
import { type IInjectInfo, instanceConfig } from "./api/InstanceInject/instanceConfig";
import { navigateTo } from "./api/navigateTo";
import { RootComponent } from "./api/RootComponent";
import { SubComponent } from "./api/SubComponent";
import type { CreateComponentType } from "./types/CreateComponentType";
import type { DetailedType } from "./types/DetailedType";
import type { ExtendComponentType } from "./types/ExtendComponentType";
import type { ParamsEqual } from "./types/TwoParamsEqual";
export type { Vant, Wm } from "./thirdLib";

export type {
  CurrentTargetDataset,
  Dataset,
  Detail,
  Mark,
  TargetDataset,
  WMBaseEvent,
  WMCustomEvent,
} from "./types/OfficialTypeAlias";

export {
  type CreateComponentType,
  DefineComponent,
  type DetailedType,
  type ExtendComponentType,
  type IInjectInfo,
  instanceConfig,
  navigateTo,
  type ParamsEqual,
  RootComponent,
  SubComponent,
};

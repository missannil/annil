import { DefineComponent } from "./api/DefineComponent";
import { type IInjectInfo, instanceConfig } from "./api/InstanceInject/instanceConfig";
import { navigateTo } from "./api/navigateTo";
import { RootComponent } from "./api/RootComponent";
import { SubComponent } from "./api/SubComponent";
import type { DetailedType } from "./types/DetailedType";
import type { DocAssign } from "./types/DocAssign";
import type { GenerateDoc } from "./types/GenerateDoc";
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
  DefineComponent,
  type DetailedType,
  type DocAssign,
  type GenerateDoc,
  type IInjectInfo,
  instanceConfig,
  navigateTo,
  type ParamsEqual,
  RootComponent,
  SubComponent,
};

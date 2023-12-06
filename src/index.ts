import { DefineComponent } from "./api/DefineComponent";
import { navigateTo } from "./api/navigateTo";
import { RootComponent } from "./api/RootComponent";
import { SubComponent } from "./api/SubComponent";
import type { ComponentDocExtension } from "./types/ComponentDocExtension";
import type { DetailedType } from "./types/DetailedType";
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
  type ComponentDocExtension,
  DefineComponent,
  type DetailedType,
  type GenerateDoc,
  /* istanbul ignore next */
  navigateTo,
  type ParamsEqual,
  RootComponent,
  SubComponent,
};

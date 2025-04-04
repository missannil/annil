import { DefineComponent } from "./api/DefineComponent";
import { type IInjectInfo, instanceConfig } from "./api/InstanceInject/instanceConfig";
import { RootComponent } from "./api/RootComponent";
import { ChunkComponent } from "./api/SlotComponent";
import { SubComponent } from "./api/SubComponent";
import { navigateBack, navigateTo, redirectTo } from "./api/wxSugar";
import type { CreateComponentType } from "./types/CreateComponentType";
import type { DetailedType } from "./types/DetailedType";
import type { ExtendComponentType } from "./types/ExtendComponentType";
import type { ParamsEqual } from "./types/TwoParamsEqual";
export * from "./utils/_utils";

export type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
  Composed,
  CustomEventsTags,
} from "./api/RootComponent/CustomEvents/CustomEventsTag";
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
  ChunkComponent,
  type CreateComponentType,
  DefineComponent,
  type DetailedType,
  type ExtendComponentType,
  type IInjectInfo,
  instanceConfig,
  navigateBack,
  navigateTo,
  type ParamsEqual,
  redirectTo,
  RootComponent,
  SubComponent,
};

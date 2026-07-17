import { ChunkComponent } from "./api/ChunkComponent";
import { CustomComponent } from "./api/CustomComponent";
import { DefineComponent } from "./api/DefineComponent";
import { type IInjectInfo, instanceConfig } from "./api/InstanceInject/instanceConfig";
import { RootComponent } from "./api/RootComponent";
import { navigateBack, navigateTo, redirectTo } from "./api/wxSugar";
import type { CreateComponentDoc } from "./types/CreateComponentDoc";
import type { DetailedType } from "./types/DetailedType";
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
  type CreateComponentDoc,
  CustomComponent,
  DefineComponent,
  type DetailedType,
  type IInjectInfo,
  instanceConfig,
  navigateBack,
  navigateTo,
  redirectTo,
  RootComponent,
};

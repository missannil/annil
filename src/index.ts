export type { Vant, Wm } from "./thirdLib";

export type { Dataset, Detail, WMBaseEvent, WMCustomEvent } from "./types/OfficialTypeAlias";

import { navigateTo } from "./api/navigateTo";

import { DefineComponent } from "./api/DefineComponent";

import { RootComponent } from "./api/RootComponent";

import { SubComponent } from "./api/SubComponent";

import type { DetailedType } from "./types/DetailedType";

import type { GenerateDoc } from "./types/GenerateDoc";
import type { ParamsEqual } from "./types/TwoParamsEqual";

export {
  DefineComponent,
  type DetailedType,
  type GenerateDoc,
  navigateTo,
  type ParamsEqual,
  RootComponent,
  SubComponent,
};

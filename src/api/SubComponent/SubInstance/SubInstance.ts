import type { RootComponentInstance } from "../../RootComponent/Instance/RootComponentInstance";

export type SubInstance<
  TAllMethods extends object,
  TDataForSetData extends object,
  AllData extends object,
  AllCustomEventsDoc extends object,
  SubStoreDoc extends object,
> = RootComponentInstance<false, TAllMethods, TDataForSetData, AllData, AllCustomEventsDoc, SubStoreDoc>;

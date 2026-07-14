import type { RootComponentInstance } from "../../RootComponent/Instance/RootComponentInstance";

export type CustomInstance<
  TAllMethods extends object,
  TDataForSetData extends object,
  AllData extends object,
  AllCustomEventsDoc extends object,
  CustomStoreDoc extends object,
> = RootComponentInstance<false, TAllMethods, TDataForSetData, AllData, AllCustomEventsDoc, CustomStoreDoc>;

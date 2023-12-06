import type { PageLifetimesOption } from "../../RootComponent/PageLifetimes/PageLifetimesOption";

export type SubPageLifetimesOption<TIsPage extends boolean, PropertiesDoc extends object> = PageLifetimesOption<
  TIsPage,
  PropertiesDoc
>;

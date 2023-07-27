import type { PageLifetimesOption } from "../../RootComponent/PageLifetimes/PageLifetimesOption";

export type SubPageLifetimesOption<TIsPage extends boolean, AllPropertiesDoc extends object> = PageLifetimesOption<
  TIsPage,
  AllPropertiesDoc
>;

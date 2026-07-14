import type { PageLifetimesOption } from "../../RootComponent/PageLifetimes/PageLifetimesOption";

export type CustomPageLifetimesOption<TIsPage extends boolean, PropertiesDoc extends object> = PageLifetimesOption<
  TIsPage,
  PropertiesDoc
>;

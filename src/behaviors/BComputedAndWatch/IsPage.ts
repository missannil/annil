import type { ComponentInstance, PageInstance } from "../../api/RootComponent/Instance/RootComponentInstance";

export function isPage(Ins: ComponentInstance | PageInstance): Ins is PageInstance {
  return typeof (Ins as PageInstance).route === "string";
}

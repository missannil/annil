import type { Func } from "hry-types";
import type { LifetimesConstraint } from "./Lifetimes/LifetimesConstraint";
import type { PageLifetimesOption } from "./PageLifetimes/PageLifetimesOption";

export type SharedRuntimeOptions = {
  observers?: Record<string, Func>;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  behaviors?: string[];
  pageLifetimes?:
    | PageLifetimesOption<false, object>["pageLifetimes"]
    | PageLifetimesOption<true, object>["pageLifetimes"];
};

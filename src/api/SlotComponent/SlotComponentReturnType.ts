import type { Func } from "hry-types/src/Misc/_api";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { SlotComputedConstraint } from "./SlotComputed/SlotComputedConstraint";
import type { StoreConstraint } from "./SlotStore/SlotStoreConstraint";

export type SlotComponentReturnType = {
  data?: DataConstraint;
  computed?: SlotComputedConstraint;
  methods?: MethodsConstraint;
  events?: EventsConstraint;
  store?: StoreConstraint;
  observers?: Record<string, Func>;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
  behaviors?: string[];
  pageLifetimes?:
    | PageLifetimesOption<false, object>["pageLifetimes"]
    | PageLifetimesOption<true, object>["pageLifetimes"];
};

// // 验证key是否合法
// type _Validator<O, Doc, ErrKeys = Exclude<keyof O, keyof Doc>> = [ErrKeys] extends [never] ? Doc
//   : `错误的字段${ErrKeys & string}`;

// /**
//  * SlotComponent Api 返回的类型
//  */
// export type SlotComponentReturnType<O extends _Validator<O, _SlotComponentReturnType> = _SlotComponentReturnType> = O;

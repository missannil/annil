import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from "..";
import { reactionRegister } from "./reactionRegister";
export function initStore(finalOptionsForComponent: FinalOptionsOfComponent) {
  return function(this: Instance) {
    const storeConfig = finalOptionsForComponent.store;
    if (!storeConfig) return;
    reactionRegister.call(this, storeConfig);
  };
}

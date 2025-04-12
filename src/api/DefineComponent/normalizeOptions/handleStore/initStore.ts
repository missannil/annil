import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from "..";
import { reactionRegister } from "./reactionRegister";
export function initStore(storeConfig: FinalOptionsOfComponent["store"] | undefined) {
  return function(this: Instance) {
    if (!storeConfig) return;
    reactionRegister.call(this, storeConfig);
  };
}

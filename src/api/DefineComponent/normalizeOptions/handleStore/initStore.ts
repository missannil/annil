import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from "..";
import { reactionRegister } from "./reactionRegister";
export function initStore(storeConfig: FinalOptionsOfComponent["store"] | undefined) {
  return function(this: Instance) {
    if (!storeConfig || this.data.__storeInited__) return;
    this.data.__storeInited__ = true; // 切记一定要在这里设置,不能放最下面,因为initStore可能多次触发,导致重复初始化，从而引起dispose无效的问题.
    reactionRegister.call(this, storeConfig);
    // this.data.__storeInited__ = true; 之前放在这里,导致dispose无效的问题。
  };
}

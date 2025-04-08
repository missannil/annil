import type { CustomComponentTrueOptions } from "../../CustomComponent";
import type { FinalOptionsOfComponent, SameFuncOptions } from ".";
import { otherFieldsHandle } from "./otherFieldsHandle";
import { sameFuncFieldsCollect } from "./sameFuncFieldsCollect";

export function subComponentsOptionHandle(
  componentOptions: FinalOptionsOfComponent,
  subComponents: CustomComponentTrueOptions[],
  funcOptions: SameFuncOptions,
) {
  subComponents.forEach((subOption) => {
    if (subOption.events) Object.assign(componentOptions.methods, subOption.events);

    sameFuncFieldsCollect(subOption, funcOptions);

    otherFieldsHandle(componentOptions, subOption);
  });
}

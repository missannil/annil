import type { ChunkComponentDefinitionRuntime } from "../../ChunkComponent/ChunkComponentDefinitionRuntime";
import type { CustomComponentDefinitionRuntime } from "../../CustomComponent/returnType";
import type { FinalOptionsOfComponent, SameFuncOptions } from ".";
import { __throttleDebounce__FieldCheck } from "./__throttleDebounce__FieldCheck";
import { otherFieldsHandle } from "./otherFieldsHandle";
import { sameFuncFieldsCollect } from "./sameFuncFieldsCollect";

export function handleSubComponents(
  componentOptions: FinalOptionsOfComponent,
  subComponents: (CustomComponentDefinitionRuntime | ChunkComponentDefinitionRuntime)[] | undefined,
  funcOptions: SameFuncOptions,
) {
  if (subComponents && subComponents.length !== 0) {
    // 验证配置中是否有内部字段__throttleDebounce__,有则报错,因为在rootComponentOptionHandle中会加入__throttleDebounce__字段到data中
    __throttleDebounce__FieldCheck(subComponents);
    subComponents.forEach((subOption) => {
      const { events, ...otherSubOptions } = subOption;
      if (events) Object.assign(componentOptions.methods, events);

      sameFuncFieldsCollect(otherSubOptions, funcOptions);

      otherFieldsHandle(componentOptions, otherSubOptions);
    });
  }
}

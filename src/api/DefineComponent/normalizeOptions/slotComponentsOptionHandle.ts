// import type { SlotComponentReturnType } from "../../ChunkComponent/SlotComponentReturnType";
// import type { FinalOptionsOfComponent, SameFuncOptions } from ".";
// import { otherFieldsHandle } from "./otherFieldsHandle";
// import { sameFuncFieldsCollect } from "./sameFuncFieldsCollect";

// /**
//  * 收集 rootComponentOptions 配置到 finalOptions 和 funcOptions 中
//  * @param finalOptions - 收集配置对象
//  * @param funcOptions  - 收集特殊配置对象字段
//  * @param slotComponentOptions - 被收集的源配置对象
//  */
// export function slotComponentOptionHandle(
//   finalOptions: FinalOptionsOfComponent,
//   slotComponentOptions: SlotComponentReturnType,
//   funcOptions: SameFuncOptions,
// ) {
//   if (slotComponentOptions.events) Object.assign(finalOptions.methods, slotComponentOptions.events);

//   sameFuncFieldsCollect(slotComponentOptions, funcOptions);

//   otherFieldsHandle(finalOptions, slotComponentOptions);
// }

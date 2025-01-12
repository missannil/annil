import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "./mock";

// 1 superDatas 中的字段不存在于RootDoc或SubDoc中
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  // @ts-expect-error 不在父级数据列表中。
  superDatas: ["errorSuperDataName"],
});

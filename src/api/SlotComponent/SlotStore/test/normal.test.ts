import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "./mock";

// 1 可以使用前缀字段
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  store: {
    slot_xxx: () => 123,
    _slot_yyy: () => "str",
  },
});

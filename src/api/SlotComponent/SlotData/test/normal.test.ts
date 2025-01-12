import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "./mock";

// 1 可以使用前缀(slot名)字段
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  data: {
    slot_xxx: 123,
  },
});

// 2 可以使用内部字段
SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  data: {
    _xxx_str: "str",
  },
});

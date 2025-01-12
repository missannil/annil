// import { RootComponent } from "../..";

import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "./mock";

// // 1 重复字段
SlotComponent<Mock_RootDoc, Mock_SubDoc, "bbb">()({
  data: {
    bbb_num: 123,
  },
  store: {
    bbb_str: () => "str",
  },
  computed: {
    // @ts-expect-error '重复字段'
    bbb_num(): string {
      return "与data字段重复";
    },
    // @ts-expect-error "重复字段"
    bbb_str(): string {
      return "与store字段重复";
    },
  },
});

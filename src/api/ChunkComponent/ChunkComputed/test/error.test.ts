// import { RootComponent } from "../..";

import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "./mock";

// // 1 重复字段
ChunkComponent<Mock_RootDoc, "bbb">()({
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
// 2 与root字段重复
ChunkComponent<{ data: { bbb_xxx: number } }>()({
  computed: {
    // @ts-expect-error '重复字段'
    bbb_xxx(): string {
      return "与root字段重复";
    },
  },
});

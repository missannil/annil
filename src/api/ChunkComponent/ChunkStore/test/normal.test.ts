import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "./mock";

// 1 可以使用前缀字段
ChunkComponent<Mock_RootDoc, "slot">()({
  store: {
    slot_xxx: () => 123,
    _slot_yyy: () => "str",
  },
});

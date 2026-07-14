import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "./mock";

// 1 不传入第二个泛型,可写入任意字段
ChunkComponent<Mock_RootDoc>()({
  data: {
    xxx: 123,
    _xxx: 123,
  },
});

// 2 传入第二个泛型,可写入前缀为 slot_ 或者 _slot_ 的字段
ChunkComponent<Mock_RootDoc, "slot">()({
  data: {
    slot_xxx: 123,
    _slot_xxx: 123,
  },
});

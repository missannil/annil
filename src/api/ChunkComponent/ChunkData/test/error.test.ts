import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "./mock";

// 1 前缀错误
ChunkComponent<Mock_RootDoc, "slot">()({
  data: {
    // @ts-expect-error "⚠️字段不合法,请使用'slot_'或'_slot_'开头的字段名⚠️")
    xxx_num: 1,
  },
});

// 2. 内部字段前缀错误
ChunkComponent<Mock_RootDoc, "xxx">()({
  data: {
    // @ts-expect-error "⚠️字段不合法,请使用'xxx_'或'_xxx_'开头的字段名⚠️")
    _xxxx_num: 1,
  },
});

// 3. 与父级字段重复
ChunkComponent<Mock_RootDoc, "slot">()({
  data: {
    // @ts-expect-error 与RootDoc中的 "⚠️字段重复⚠️")
    slot_num: 1,
    // @ts-expect-error 与RootDoc中的 "⚠️字段重复⚠️")
    _slot_str: "1",
  },
});

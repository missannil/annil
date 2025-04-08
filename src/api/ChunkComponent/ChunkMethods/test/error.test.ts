/* eslint-disable @typescript-eslint/no-empty-function */
import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkData/test/mock";

// 1. 与RootDoc的event或methods重复
ChunkComponent<Mock_RootDoc, "xxx">()({
  methods: {
    // @ts-expect-error 与RootDoc的events中的字段重复
    xxx_onTap() {},
    // @ts-expect-error 与RootDoc的methods中的字段重复
    xxx_test() {},
  },
});

// 3 与自身的events中的字段重复
ChunkComponent<Mock_RootDoc, "xxx">()({
  events: {
    xxx_eventA() {},
  },
  methods: {
    // @ts-expect-error 与自身的events中的字段重复
    xxx_eventA() {},
  },
});
// 4 前缀错误
ChunkComponent<Mock_RootDoc, "slot">()({
  methods: {
    // @ts-expect-error "⚠️字段不合法,请使用'slot_'或'_slot_'开头的字段名⚠️")
    xxx_num() {},
  },
});

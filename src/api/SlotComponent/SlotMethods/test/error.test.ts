/* eslint-disable @typescript-eslint/no-empty-function */
import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "../../SlotData/test/mock";

// 1. 与RootDoc的event或methods重复
SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  methods: {
    // @ts-expect-error 与RootDoc的events中的字段重复
    xxx_onTap() {},
    // @ts-expect-error 与RootDoc的methods中的字段重复
    xxx_test() {},
  },
});

// 2. 与SubDoc的event或methods中的字段重复
SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  methods: {
    // @ts-expect-error 与SubDoc的events中的字段重复
    xxx_subEvent() {},
    // @ts-expect-error 与SubDoc的methods中的字段重复
    xxx_subMethods() {},
  },
});

// 3 与自身的events中的字段重复
SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  events: {
    xxx_eventA() {},
  },
  methods: {
    // @ts-expect-error 与自身的events中的字段重复
    xxx_eventA() {},
  },
});
// 4 前缀错误
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  methods: {
    // @ts-expect-error "⚠️字段不合法,请使用'slot_'或'_slot_'开头的字段名⚠️")
    xxx_num() {},
  },
});

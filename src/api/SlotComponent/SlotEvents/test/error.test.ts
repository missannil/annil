/* eslint-disable @typescript-eslint/no-empty-function */
import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "../../SlotData/test/mock";

// 1. 与RootDoc的event或methods重复
SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  events: {
    // @ts-expect-error 与RootDoc的event重复
    xxx_onTap() {
    },
    // @ts-expect-error 与RootDoc的methods重复
    xxx_test() {
    },
  },
});
// 2. 与SubDoc的event或methods重复
SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  events: {
    // @ts-expect-error 与SubDoc的event重复
    xxx_subEvent() {
    },
    // @ts-expect-error 与SubDoc的methods重复
    xxx_subMethods() {
    },
  },
});

// 3 前缀错误
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  events: {
    // @ts-expect-error "⚠️字段不合法,请使用'slot_'或'_slot_'开头的字段名⚠️")
    xxx_num() {
    },
  },
});

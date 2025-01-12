import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "../../SlotData/test/mock";

// 1. 没有对应字段报错
SlotComponent<Mock_RootDoc, Mock_SubDoc, "zzz">()({
  watch: {
    // @ts-expect-error 没有对应字段报错
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xxx() {},
  },
});

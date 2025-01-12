/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Checking } from "hry-types";
import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "../../SlotData/test/mock";

// 1. 定义前缀为ddd的方法
SlotComponent<Mock_RootDoc, Mock_SubDoc, "ddd">()({
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ddd_xxx() {},
  },
});

// 2. 可以调用RootDoc中的methods字段
SlotComponent<Mock_RootDoc, Mock_SubDoc, "ddd">()({
  methods: {
    ddd_xxx() {
      Checking<ReturnType<typeof this.xxx_test>, void, true>;
    },
  },
});
// 2. 可以调用SubDoc中的methods字段
SlotComponent<Mock_RootDoc, Mock_SubDoc, "ddd">()({
  methods: {
    ddd_xxx() {
      Checking<ReturnType<typeof this.xxx_subMethods>, void, true>;
    },
  },
});

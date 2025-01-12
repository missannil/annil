/* eslint-disable @typescript-eslint/no-empty-function */
import { SlotComponent } from "..";
import type { Mock_RootDoc, Mock_SubDoc } from "../SLotSuperDatas/test/mock";

// 1. 页面时组件的生命周期
SlotComponent<Mock_RootDoc & { isPage: true }, Mock_SubDoc, "ggg">()({
  lifetimes: {
    attached() {
    },
    detached() {
    },
    // ...
  },
});
// 2. 组件时组件的生命周期
SlotComponent<Mock_RootDoc, Mock_SubDoc, "ggg">()({
  lifetimes: {
    attached() {
    },
    detached() {
    },
    // ...
  },
});

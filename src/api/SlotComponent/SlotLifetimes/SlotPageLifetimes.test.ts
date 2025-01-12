/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import { SlotComponent } from "..";
import type { Mock_RootDoc, Mock_SubDoc } from "../SLotSuperDatas/test/mock";

// 1. 页面时页面的生命周期
SlotComponent<Mock_RootDoc & { isPage: true }, Mock_SubDoc, "ggg">()({
  pageLifetimes: {
    onLoad(props) {
      props.required_num;
    },
    onShow() {
    },
    // ...
  },
});
// 2. 组件时页面的生命周期
SlotComponent<Mock_RootDoc, Mock_SubDoc, "ggg">()({
  pageLifetimes: {
    show() {
    },
    hide() {
    },
    // ...
  },
});

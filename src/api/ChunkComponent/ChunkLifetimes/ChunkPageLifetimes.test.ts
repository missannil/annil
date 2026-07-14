/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChunkComponent } from "..";
import type { Mock_RootDoc } from "../ChunkData/test/mock";

// 1. 页面时页面的生命周期
ChunkComponent<Mock_RootDoc & { isPage: true }, "ggg">()({
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
ChunkComponent<Mock_RootDoc, "ggg">()({
  pageLifetimes: {
    show() {
    },
    hide() {
    },
    // ...
  },
});

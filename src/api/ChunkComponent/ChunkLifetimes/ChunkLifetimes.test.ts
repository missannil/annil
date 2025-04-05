/* eslint-disable @typescript-eslint/no-empty-function */
import { ChunkComponent } from "..";
import type { Mock_RootDoc } from "../ChunkData/test/mock";

// 1. 页面时组件的生命周期
ChunkComponent<Mock_RootDoc & { isPage: true }, "ggg">()({
  lifetimes: {
    attached() {
    },
    detached() {
    },
    // ...
  },
});
// 2. 组件时组件的生命周期
ChunkComponent<Mock_RootDoc, "ggg">()({
  lifetimes: {
    attached() {
    },
    detached() {
    },
    // ...
  },
});

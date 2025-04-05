import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkData/test/mock";

// 1. 没有对应字段报错
ChunkComponent<Mock_RootDoc, "zzz">()({
  watch: {
    // @ts-expect-error 没有对应字段报错
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xxx() {},
  },
});

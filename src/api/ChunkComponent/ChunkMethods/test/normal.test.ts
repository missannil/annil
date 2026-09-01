/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../../utils/typeEqual";
import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkData/test/mock";

// 1. 定义前缀为ddd的方法
ChunkComponent<Mock_RootDoc, "ddd">()({
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ddd_xxx() {},
  },
});

// 2. 可以调用RootDoc中的methods字段
ChunkComponent<Mock_RootDoc, "ddd">()({
  methods: {
    ddd_xxx() {
      typeEqual<ReturnType<typeof this.xxx_test>, void>;
    },
  },
});

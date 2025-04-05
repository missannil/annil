import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkData/test/mock";

ChunkComponent<Mock_RootDoc, "xxx">()({
  events: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xxx_ddd() {},
  },
});

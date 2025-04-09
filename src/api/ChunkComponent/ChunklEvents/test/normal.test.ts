import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkData/test/mock";

ChunkComponent<Mock_RootDoc, "xxx">()({
  events: {
    xxx_ddd() {
      void 0;
    },
  },
});
ChunkComponent<{}>()({
  data: {
    ddd_src: "string",
    ddd_arr: [1, 2, 3],
  },
  methods: {
    ddffa() {
      void 0;
    },
  },
  events: {
    ddd_aaa(e) {
      console.log(e);
    },
  },
});

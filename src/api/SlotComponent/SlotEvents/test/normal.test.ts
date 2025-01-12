import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "../../SlotData/test/mock";

SlotComponent<Mock_RootDoc, Mock_SubDoc, "xxx">()({
  events: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xxx_ddd() {},
  },
});

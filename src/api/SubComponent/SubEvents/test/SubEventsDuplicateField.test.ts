import type { BubblesComposedSign, BubblesSign } from "../../../MainComponent/CustomEvents/SignForCustomEvents";
import { SubComponent } from "../..";

type $Doc = {
  customEvents: {
    aaa_str: string;
    aaa_num: number;
    aaa_union: string | number;
    aaa_bubbles: string | BubblesSign;
    aaa_bubblesComposed: number | BubblesComposedSign;
    aaa_never: never;
  };
};

type MainDoc = {
  methods: {
    a: () => void;
  };
  events: {
    b: () => void;
  };
  customEvents: {
    c: string;
  };
};

SubComponent<MainDoc, $Doc>()({
  events: {
    aaa_bubbles(e) {
      e;
    },
    // @ts-expect-error 与主methods字段重复
    a() {
      1;
    },
    // @ts-expect-error 与主events字段重复
    b() {
      1;
    },
    // @ts-expect-error 与主customEvents字段重复
    c() {
      1;
    },
  },
});

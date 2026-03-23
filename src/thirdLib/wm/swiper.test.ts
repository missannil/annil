import { CustomComponent, typeEqual } from "../../index";
import type { Wm } from "../index";

CustomComponent<{}, Wm.Swiper>()({
  data: {
    swiper_style: "16/9",
  },
  computed: {
    swiper_class() {
      return `w-full h-auto ${this.data.swiper_style}`;
    },
  },
  events: {
    swiper_change(e) {
      typeEqual<number>(e.detail.current);
    },

    swiper_animationfinish(e) {
      typeEqual<number>(e.detail.current);
    },
  },
});

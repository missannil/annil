import { CustomComponent, typeEqual } from "../../index";
import type { Wm } from "../index";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const swiper = CustomComponent<{}, Wm.Swiper>()({
  data: {
    swiper_style: "16/9",
  },
  computed: {
    swiper_class() {
      return `w-full h-auto ${this.data.swiper_style}`;
    },
  },
  events: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    swiper_change(e) {
      typeEqual<typeof e.detail.current, number>();
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    swiper_animationfinish(e) {
      typeEqual<typeof e.detail.current, number>();
    },
  },
});

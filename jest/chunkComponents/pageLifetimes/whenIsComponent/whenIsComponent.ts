import { ChunkComponent, DefineComponent, RootComponent } from "../../../../src";
import { user } from "./whenIsComponent.test";

const slot = ChunkComponent<Root, "slot">()({
  data: {
    slot_num: 100,
  },
  lifetimes: {
    beforeCreate(options) {
      options.pageLifetimes.load?.();
    },
    created() {
      // 模拟组件 添加is
      this.is = "components/compA/compA";
    },
  },
  pageLifetimes: {
    load() {
      user.age++;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  pageLifetimes: {
    load() {
      user.age++;
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  name: "compA",
  rootComponent,
  slotComponents: [slot],
});
export type $Index = typeof index;

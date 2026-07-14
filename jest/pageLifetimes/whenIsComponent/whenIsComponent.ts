import { CustomComponent, DefineComponent, RootComponent } from "../../../src";
import { user } from "./whenIsComponent.test";

const subA = CustomComponent<Root, { properties: { subA_num: number } }>()({
  data: {
    subA_num: 100,
  },
  pageLifetimes: {
    show() {
      user.age++;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  lifetimes: {
    beforeCreate(options) {
      options.pageLifetimes.show?.();
    },
    created() {
      // 模拟组件 添加is
      this.is = "components/compA/compA";
    },
  },
  pageLifetimes: {
    show() {
      user.age++;
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  name: "compA",
  rootComponent,
  subComponents: [subA],
});
export type $Index = typeof index;

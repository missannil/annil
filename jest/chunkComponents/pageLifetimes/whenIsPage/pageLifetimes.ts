import { ChunkComponent, DefineComponent, type DetailedType, RootComponent } from "../../../../src";
const slot = ChunkComponent<Root, "slot">()({
  lifetimes: {
    created() {
      // 模拟页面 添加is和route
      this.is = this.route = "pages/index/index";
    },
  },
  pageLifetimes: {
    onLoad(data) {
      // @ts-ignore
      this.data.age = data.user.age;
    },
  },
});
type Root = typeof rootComponent;
const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    user: Object as DetailedType<{ name: string; age: number }>,
  },
  data: {
    age: 10,
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  // slotComponents: [slot],
  subComponents: [slot],
});
export type $Index = typeof index;

import { DefineComponent, type DetailedType, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    user: Object as DetailedType<{ name: string; age: number }>,
  },
  data: {
    age: 10,
  },
  lifetimes: {
    created() {
      // 模拟页面 添加is和route
      this.is = this.route = "pages/index/index";
    },
    attached() {
      // @ts-ignore 模拟onLoad传值
      this.onLoad({ user: { name: "zhao", age: 20 } });
    },
  },
  pageLifetimes: {
    onLoad(data) {
      // @ts-ignore
      this.data.age = data.user.age;
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  // subComponents:[]
});
export type $Index = typeof index;

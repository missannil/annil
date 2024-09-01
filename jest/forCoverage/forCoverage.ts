import { DefineComponent, RootComponent } from "../../src";
const rootComponent = RootComponent()({
  // 为了覆盖率 忽略它
  export() {
    return {};
  },
  properties: {
    str: String, // 为了覆盖率，忽略
    num: Number, // 为了覆盖率，忽略
    bool: Boolean, // 为了覆盖率，忽略
    unionrequired: {
      type: Array, // 为了覆盖率，忽略
      optionalTypes: [Number], // 为了覆盖率，忽略
    },
  },
  data: {
    count: 1,
  },
  computed: {
    num_count() {
      return this.data.count + 1;
    },
  },
  lifetimes: {
    attached() {
      // 为了覆盖率,计算属性无需更新时的代码 忽略
      this.setData({
        count: 1,
      });

      this.setData({
        count: 2,
      });

      // console.log(this.data.count);
    },
  },
  observers: {
    "**"() {
      // console.log("为了覆盖率");
      // 为了覆盖率,计算属性无需更新时的代码 忽略
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
});

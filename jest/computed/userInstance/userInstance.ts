import { DefineComponent, RootComponent, SubComponent } from "../../../src";
import { type CompDoc } from "../../common";

const subA = SubComponent<Root, CompDoc>()({
  computed: {
    compA_num(): number {
      return this.increase(2) + this.data.num;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    num: 1,
  },
  computed: {
    // 可使用this上的属性和方法和外部数据,但要特别注意方法的副作用，建议不使用或使用的方法为纯函数。
    age() {
      // if(this.xxx){
      return this.increase(1) + this.data.num;
      // }
    },
  },
  methods: {
    increase(num: number) {
      return num + 1;
    },
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          num: 2,
        });
      }, 1000);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

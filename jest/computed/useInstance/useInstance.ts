import { type CreateComponentDoc, CustomComponent, DefineComponent, RootComponent } from "../../../src";

type $SubA = CreateComponentDoc<"subA", {
  properties: {
    num: number;
    instanceId: string;
  };
}>;
const subA = CustomComponent<Root, $SubA>()({
  data: {
    subA_num: 0,
  },
  computed: {
    subA_instanceId() {
      // console.log("this.id === 'annil' => true");
      return this.id;
    },
  },
});

type Root = typeof rootComponent;
type NormalGoods = { type: "normal"; xxx: "xxx" };
type SpecialGoods = { type: "special"; yyy: "yyy" };
type Goods = NormalGoods | SpecialGoods;
const rootComponent = RootComponent()({
  data: {
    goods: { type: "normal", xxx: "xxx" } as Goods,
  },
  methods: {
    isNormalGoods(goods: Goods): goods is NormalGoods {
      return goods.type === "normal";
    },
  },
  computed: {
    normalGoodsXXX(): string {
      const { goods } = this.data;
      return this.isNormalGoods(goods) ? goods.xxx : goods.yyy;
    },
  },
  lifetimes: {
    created() {
      this.id = "annil";
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

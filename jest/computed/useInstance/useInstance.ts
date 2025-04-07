import { ChunkComponent, DefineComponent, RootComponent } from "../../../src";

const subA = ChunkComponent<Root>()({
  data: {
    compA_num: 0,
  },
  computed: {
    instanceId() {
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

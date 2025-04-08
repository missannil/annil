import { ChunkComponent, CustomComponent, DefineComponent, RootComponent } from "../../../src";
import { type CompDoc } from "../../common";
import { store } from "./InitializationOnAttached.test";

const customA = CustomComponent<Root, CompDoc>()({
  computed: {
    compA_num(): number {
      return (this.data.CDataNum + this.data.CStoreAge) * 2;
    },
  },
});
const chunk = ChunkComponent<Root, "chunk">()({
  computed: {
    chunk_CStoreAge(): number {
      return this.data.CStoreAge + 1;
    },
    chunk_CDataNum(): number {
      return this.data.CDataNum + 1;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    num: 1,
  },
  store: {
    storeAge: () => store.age,
  },
  computed: {
    CStoreAge(): number {
      return this.data.storeAge;
    },
    CDataNum(): number {
      return this.data.num;
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [chunk, customA],
});

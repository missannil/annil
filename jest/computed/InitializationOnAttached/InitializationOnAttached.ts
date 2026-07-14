import { CustomComponent, DefineComponent, RootComponent } from "../../../src";
import type { ComponentDoc } from "../../../src/api/DefineComponent/returnType/ComponentDoc";
import { type CompDoc } from "../../common";
import { store } from "./InitializationOnAttached.test";

const customA = CustomComponent<Root, CompDoc>()({
  computed: {
    compA_num(): number {
      return (this.data.CDataNum + this.data.CStoreAge) * 2;
    },
  },
});
type $Chunk = ComponentDoc<{
  properties: {
    chunk_num?: number;
    chunk_CStoreAge?: number;
    chunk_CDataNum?: number;
  };
}>;
const chunk = CustomComponent<Root, $Chunk>()({
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

import { observable } from "mobx";
import { CustomComponent, DefineComponent, RootComponent } from "../../../src";
import { type CompDoc } from "../../common";

const store = observable({
  name: "zhao",
  list: [] as number[],
  changedList(list: number[]) {
    this.list = list;
  },
});

const subA = CustomComponent<Root, CompDoc>()({
  data: {
    compA_num: 0,
  },
  computed: {
    _compA_listMap() {
      return this.data.storeList.map((item) => item + 2);
    },
    _compA_xxx() {
      return this.data.storeList.length;
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  store: {
    storeList: () => store.list,
  },
  data: {
    objFun: {
      a: 1,
      add(num: number) {
        return num + 1;
      },
    },
  },
  computed: {
    objFunAdd() {
      return this.data.objFun.add(this.data.objFun.a);
    },
    listMap() {
      return this.data.storeList[0] + 1;
    },
    ddd() {
      return this.data.storeList;
    },
  },
  lifetimes: {
    attached() {
      store.changedList([1, 2, 3]);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [subA],
});

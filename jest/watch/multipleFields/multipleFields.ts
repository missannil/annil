import { DefineComponent, RootComponent } from "../../../src";

interface User {
  name: string;
  age: number;
}

const rootComponent = RootComponent()({
  data: {
    num: 123,
    obj: { name: "zhao", age: 20 } as User,
    watchValues: [],
    watchCount: 0,
  },
  computed: {
    rootNum() {
      return this.data.num;
    },
    age() {
      return this.data.obj.age;
    },
  },
  watch: {
    // @ts-ignore
    "rootNum,age,obj.name"(newRootNum, newAge, newObjName, oldRootNum, oldAge, oldObjName) {
      this.data.watchCount++;
      // @ts-ignore
      this.data.watchValues = [newRootNum, newAge, newObjName, oldRootNum, oldAge, oldObjName];
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
});

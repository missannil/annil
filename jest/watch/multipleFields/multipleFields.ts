import { DefineComponent, RootComponent } from "../../../src";

interface User {
  name: string;
  age: number;
}

const rootComponent = RootComponent()({
  data: {
    num: 123,
    obj: { name: "zhao", age: 20 } as User,
    valueList: [],
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
      // @ts-ignore
      this.data.valueList = [newRootNum, newAge, newObjName, oldRootNum, oldAge, oldObjName];
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        num: 456,
      });

      setTimeout(() => {
        this.setData({
          "obj.age": 30,
        });

        setTimeout(() => {
          this.setData({
            "obj.name": "lili",
          });
        }, 0);
      }, 0);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
});

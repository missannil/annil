import { Checking, type Test } from "hry-types";
import { observable } from "mobx";
import { RootComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

const storeDoc = RootComponent()({
  store: {
    userName: () => user.name,
    userAge: () => user.age,
  },
});
void storeDoc;
interface StoreDocExpected {
  store: {
    userName: string;
    userAge: number;
  };
}

// 返回类型为函数返回类型
void Checking<typeof storeDoc, StoreDocExpected, Test.Pass>;

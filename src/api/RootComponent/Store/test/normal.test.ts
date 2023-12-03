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

type StoreDocExpected = {
  store: {
    userName: string;
    userAge: number;
  };
};

Checking<typeof storeDoc, StoreDocExpected, Test.Pass>;

import { observable } from "mobx";
import { RootComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

RootComponent()({
  state: {
    userName: () => user.name,
    userAge: () => user.age,
  },
});

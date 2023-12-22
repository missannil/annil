import { observable } from "mobx";

export const user = observable({
  name: "zhao",
  age: 10,
  changeAge(num: number) {
    this.age = num;
  },
});

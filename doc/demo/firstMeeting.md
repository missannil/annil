```ts
import { DefineComponent, DetailedType, RootComponent } from "annil";
import { observable } from "mobx";

const girl = observable({
  name: "li",
  age: 23,
  yearAfterYear() {
    this.age + 1;
  },
});
type Person = {
  name: string;
  age: number;
};
const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    boy: {
      type: Object as DetailedType<Person>,
      value: { name: "zhao", age: 22 },
    },
  },
  data: { year: "2002" },
  store: {
    girlAge: () => girl.age,
    girlName: () => girl.name,
  },
  computed: {
    first() {
      return `${this.data.boy.name} meets ${this.data.girlName} in ${this.data.year}`;
    },
  },
  watch: {
    girlAge(newAge, oldAge) {
      if (newAge === 23) {
        console.log(`第一次见面时她${oldAge}岁`);
      }
    },
  },
  pageLifetimes: {
    onLoad() {
      setTimeout(() => {
        girl.yearAfterYear();
      }, 1000);
    },
  },
});
DefineComponent({
  path: "/pages/index/index",
  rootComponent,
});
```

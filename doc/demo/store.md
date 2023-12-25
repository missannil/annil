### store字段 可引入基于mobx的全局状态(响应式数据)。

```ts
import { DefineComponent, type DetailedType, RootComponent } from "annil";
import { observable } from "mobx";

type User = { name: string; age: number };

const storeUser = observable<User>({
  name: "zhao",
  age: 20,
  changeName(name: string) {
    this.name = name;
  },
  changeAge(age: number) {
    this.age = age;
  },
});
type DemoComp = { properties: { demo_age: number } };
const rootComponent = SubComopnent<{}>()({
  store: {
    demo_age: () => storeUser.age,
  },
  lifetimes: {
    attached() {
      console.log(this.data.demo_age); // 20
      storeUser.changeAge(30);
      console.log(this.data.demo_age); // 30
    },
  },
});
const rootComponent = RootComponent()({
  store: {
    name: () => storeUser.name,
  },
  lifetimes: {
    attached() {
      console.log(this.data.name); // 'zhao'
      storeUser.changeName("li");
      console.log(this.data.name); // 'li'
    },
  },
});

const store = DefineComponent({
  name: "store",
  rootComponent,
});

export type $Store = typeof store;
```

### watch字段

可定义所有数据字段(properties,data,store,computed中定义的),数据改变时(深度相等比较)运行定义函数,参数包含旧值,可监控多个字段或子字段。

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
});

const rootComponent = RootComponent()({
  properties: {
    user: Object as DetailedType<User>, // 默认null
  },
  data: {
    Duser: { name: "zhao", age: 20 },
  },
  store: {
    name: () => storeUser.name,
  },
  computed: {
    age() {
      return this.data.user?.age || 0;
    },
  },
  watch: {
    user(newValue, oldValue) {
      console.log(newValue, oldValue); // {name:'li',age:30}, null
    },
    "Duser.age"(newValue, oldValue) {
      console.log(newValue, oldValue); // 30, 20
    },
    name(newValue, oldValue) {
      console.log(newValue, oldValue); // "li", "zhao"
    },
    age(newValue, oldValue) {
      console.log(newValue, oldValue); // 30, 0
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        "Duser.age": 30,
        // 模拟properteis.user传入新值
        user: { name: "li", age: 30 },
      });
      storeUser.changeName("li");
    },
  },
});

const watch = DefineComponent({
  name: "watch",
  rootComponent,
});

export type $Watch = typeof computed;
```

**RootComponent下的computed字段**

```ts
import { DefineComponent, type DetailedType, RootComponent } from "annil";
import { observable } from "mobx";

type User = { name: string; age: number };

const storeUser = observable<User>({
  name: "zhao",
  age: 20,
});

const rootComponent = RootComponent()({
  properties: {
    user: Object as DetailedType<User>,
    userOptional: {
      type: Object as DetailedType<User>,
      value: { name: "zhao", age: 20 },
    },
  },
  data: {
    Duser: { name: "zhao", age: 20 },
  },
  store: {
    Sage: () => storeUser.age,
  },

  computed: {
    // 1. 引用properties字段
    age() {
      return this.data.user?.age || 0;
    },
    // 2. 引用data字段
    Dname() {
      return this.data.Duser.name;
    },
    // 3. 引用store字段
    SagePlus() {
      return this.data.Sage + 1;
    },
    // 5. 引用其他计算属性
    refOtherComputedFields() {
      return this.data.age + this.data.SagePlus;
    },
  },
});
const computed = DefineComponent({
  name: "computed",
  rootComponent,
});

export type $Computed = typeof computed;
```

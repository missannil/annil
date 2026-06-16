import { observable } from "mobx";
import { typeEqual } from "../../../../utils/_utils";
import { RootComponent } from "../..";
const user = observable({
  name: "zhao",
  age: 20,
});

const storeDoc = RootComponent()({
  properties: {
    condition: Number,
  },
  store: {
    // normal
    userName: () => user.name,
    // 条件反应式,当condition>10时,响应式,否则不可响应式(返回undefined),但不报错(有警告).
    userAge: (props) => {
      if (props.condition > 10) {
        return user.age;
      }
      return undefined;
    },
  },
});

type StoreDocExpected = {
  properties: {
    condition: number;
  };
  store: {
    userName: string;
    userAge: number | undefined;
  };
};
typeEqual<StoreDocExpected>()(storeDoc);

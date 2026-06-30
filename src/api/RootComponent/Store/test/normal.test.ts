import { Checking, type Test } from "hry-types";
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
    optional: {
      type: Number,
      value: 10,
    },
  },
  data: {
    injectStr: 123,
  },
  store: {
    // 1. 简单的箭头函数写法
    userName: () => user.name,
    // 2. 使用参数 datas
    userAge: (datas) => {
      // 参数类型为Required<PropertiesDef> & DataDef & Omit<InjectData, keyof (PropertiesDef & DataDef).
      Checking<
        typeof datas,
        { condition: number; optional: number; injectStr: number; injectNum: number },
        Test.Pass
      >();

      if (datas.condition > 10) {
        return user.age;
      }
      // 返回undefined时字段不会被响应式追踪,不会报错(有警告).
      return undefined;
    },
  },
});

type StoreDocExpected = {
  properties: {
    optional?: number;
    condition: number;
  };
  data: {
    injectStr: number;
  };
  store: {
    userName: string;
    userAge: number | undefined;
  };
};
typeEqual<StoreDocExpected>()(storeDoc);

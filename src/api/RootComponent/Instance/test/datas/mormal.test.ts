import { Checking, type Test } from "hry-types";
import { type DetailedType, RootComponent } from "../../../../..";

// 组件时
RootComponent()({
  properties: {
    obj: Object,
    optionalObj: {
      type: Object as DetailedType<{ name: string }>,
      value: { name: "zhao" },
    },
  },
  data: {
    dataStr: "dataStr",
    // 相同字段覆盖注入类型
    injectStr: 123,
  },
  store: {
    storeData: (data) => {
      return data.optionalObj.name;
    },
  },
  lifetimes: {
    attached() {
      // 组件实例对象格外添加null类型
      Checking<
        typeof this.data,
        {
          optionalObj: {
            name: string;
          };
          obj: object;
          dataStr: string;
          storeData: string;
          injectTheme: "dark" | "light" | undefined;
          injectStr: number; // 相同字段覆盖注入类型 injectStr: string -> number
          injectNum: number;
        },
        Test.Pass
      >();
    },
  },
});

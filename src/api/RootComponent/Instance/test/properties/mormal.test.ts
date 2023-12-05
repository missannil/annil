import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/ReadonlyDeep";
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
  lifetimes: {
    attached() {
      // 组件实例对象格外添加null类型
      Checking<typeof this.data, ReadonlyDeep<{ optionalObj: { name: string } | null; obj: object | null }>, Test.Pass>;
    },
  },
});

// 页面时
RootComponent()({
  isPage: true,
  properties: {
    obj: Object,
    optionalObj: {
      type: Object as DetailedType<{ name: string }>,
      value: { name: "zhao" },
    },
  },
  pageLifetimes: {
    onLoad(data) {
      Checking<typeof data, {
        optionalObj?: {
          name: string;
        };
        obj: object;
      }, Test.Pass>;

      // 页面实例对象不额外添加null
      Checking<typeof this.data.optionalObj, ReadonlyDeep<{ name: string }>, Test.Pass>;

      // 页面实例对象不额外添加null
      Checking<typeof this.data.obj, object, Test.Pass>;
    },
  },
});

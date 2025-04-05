/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Checking, type Test } from "hry-types";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import { type DetailedType, RootComponent } from "../../../../..";
import type { IInjectAllData } from "../../../../InstanceInject/instanceConfig";

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
      Checking<
        typeof this.data,
        ComputeIntersection<
          {
            optionalObj: { name: string };
            obj: object;
          } & IInjectAllData
        >,
        Test.Pass
      >;
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
      // 页面可选对象不额外添加null
      Checking<typeof this.data.optionalObj, { name: string }, Test.Pass>;
      // 页面必传对象没有null
      Checking<typeof this.data.obj, object, Test.Pass>;
    },
  },
});

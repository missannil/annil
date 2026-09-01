/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { _SimplifyIntersection } from "hry-types";
import { type DetailedType, RootComponent } from "../../../../..";
import { typeEqual } from "../../../../../utils/typeEqual";
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
      typeEqual<
        typeof this.data,
        _SimplifyIntersection<
          {
            optionalObj: { name: string };
            obj: object;
          } & IInjectAllData
        >
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
      typeEqual<typeof data, {
        optionalObj: {
          name: string;
        };
        obj: object;
      }>;
      // 页面可选对象不额外添加null
      typeEqual<typeof this.data.optionalObj, { name: string }>;
      // 页面必传对象没有null
      typeEqual<typeof this.data.obj, object>;
    },
  },
});

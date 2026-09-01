/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../../utils/typeEqual";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import { RootComponent } from "../..";

// data为空对象时
const EmptyDataRootDoc = RootComponent()({
  data: {},
  methods: {
    M1() {
      // 3.1 data为空对象时 this.data为注入数据类型
      typeEqual<typeof this.data, IInjectAllData>;
    },
  },
});
void EmptyDataRootDoc;
// 3.2 data为空对象时 返回文档中无data字段
typeEqual<typeof EmptyDataRootDoc, { methods: { M1: () => void } }>;

/**
 *  无data字段时
 */
const noDataRootDoc = RootComponent()({
  methods: {
    M1() {
      // 4.1 data为空对象时 this.data为注入数据类型
      typeEqual<typeof this.data, IInjectAllData>;
    },
  },
});
void noDataRootDoc;
// 4.2 data为空对象时 返回文档中无data字段
typeEqual<typeof noDataRootDoc, { methods: { M1: () => void } }>;

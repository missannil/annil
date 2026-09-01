import { typeEqual } from "../../../../utils/typeEqual";

import type { DetailedType } from "../../../../types/DetailedType";
import { RootComponent } from "../..";
import type { Mock_User } from "../../Properties/test/normalRequired.test";

/**
 *  1 computed字段时需要手写类型,可悬停鼠标到key查看类型,深度只读
 */
RootComponent()({
  properties: {
    Pnum: Number,
    obj: Object as DetailedType<Mock_User>,
  },
  data: {
    DNum: 123,
  },
  computed: {
    CNum() {
      return this.data.Pnum + this.data.DNum;
    },
    Cobj() {
      return this.data.obj;
    },
  },
  watch: {
    CNum(newValue: number, oldValue: number) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    Cobj(newValue: Mock_User, oldValue: Mock_User | null) {
      void oldValue;
      void typeEqual<Mock_User, typeof newValue>;

      void typeEqual<Mock_User | null, typeof oldValue>;
    },
  },
});

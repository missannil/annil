import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
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
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    Cobj(newValue: ReadonlyDeep<Mock_User>, oldValue: ReadonlyDeep<Mock_User> | null) {
      Checking<ReadonlyDeep<Mock_User>, typeof newValue, Test.Pass>;

      Checking<ReadonlyDeep<Mock_User> | null, typeof oldValue, Test.Pass>;
    },
  },
});

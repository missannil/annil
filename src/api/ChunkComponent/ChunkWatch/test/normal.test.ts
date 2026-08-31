import { observable } from "mobx";
import { typeEqual } from "../../../../utils/typeEqual";
import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkData/test/mock";

const obj = observable({
  gender: "male" as "male" | "female",
});
type Mock_user = {
  name: string;
  age?: number;
};
/**
 * watch data字段 深度只读
 */
ChunkComponent<Mock_RootDoc, "zzz">()({
  data: {
    zzz_num: 123,
    zzz_obj: {} as Mock_user,
  },
  store: {
    zzz_gender: () => obj.gender,
  },
  computed: {
    zzz_computed(): number {
      return this.data.zzz_num + (this.data.zzz_obj.age ?? 1);
    },
  },
  watch: {
    // watch data字段
    zzz_num(newValue, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    // watch store字段
    zzz_obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_user, typeof newValue>;

      void typeEqual<Mock_user, typeof oldValue>;
    },
    // watch computed字段
    zzz_computed(newValue: number, oldValue: number) {
      void oldValue;
      void typeEqual<number, typeof newValue>;
      void typeEqual<number, typeof oldValue>;
    },
    // watch RootDoc字段
    optional_obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<object | null, typeof newValue>;

      void typeEqual<object | null, typeof oldValue>;
    },
  },
});

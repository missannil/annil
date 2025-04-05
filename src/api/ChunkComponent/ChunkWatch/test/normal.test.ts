import { Checking } from "hry-types";
import { observable } from "mobx";
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
      void Checking<number, typeof newValue, true>;

      void Checking<number, typeof oldValue, true>;
    },
    // watch store字段
    zzz_obj(newValue, oldValue) {
      void oldValue;
      void Checking<Mock_user, typeof newValue, true>;

      void Checking<Mock_user, typeof oldValue, true>;
    },
    // watch computed字段
    zzz_computed(newValue: number, oldValue: number) {
      void oldValue;
      void Checking<number, typeof newValue, true>;
      void Checking<number, typeof oldValue, true>;
    },
    // watch RootDoc字段
    optional_obj(newValue, oldValue) {
      void oldValue;
      void Checking<object | null, typeof newValue, true>;

      void Checking<object | null, typeof oldValue, true>;
    },
  },
});

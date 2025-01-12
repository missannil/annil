import { Checking } from "hry-types";

import { observable } from "mobx";

import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "../../SlotData/test/mock";

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
SlotComponent<Mock_RootDoc, Mock_SubDoc, "zzz">()({
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
      void Checking<object, typeof newValue, true>;

      void Checking<object | null, typeof oldValue, true>;
    },
    // watch SubDoc字段
    aaa_obj1(newValue, oldValue) {
      void oldValue;
      void Checking<object, typeof newValue, true>;

      void Checking<object | null, typeof oldValue, true>;
    },
    // @ts-expect-error 没有对应字段报错
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xxx() {},
  },
});

import { Checking, type Test } from "hry-types";
import { MainComponent } from "../..";

import { mock_data } from "../../Data/test/DataConstraint.test";
import { type Mock_Cart, mock_properties, type Mock_User } from "../../Properties/test/PropertiesConstraint.test";
// str: String,
//   num: Number,
//   bool: Boolean,
//   arr: Array,
//   obj: Object,
//   tuple: Array as unknown as SpecificType<[string, number, boolean]>,
//   union_str: String as SpecificType<"male" | "female">,
//   union_num: Number as SpecificType<0 | 1 | 2>,
//   union_bool: Boolean as SpecificType<false | true>,
//   union_arr: Array as SpecificType<number[] | string[]>,
//   union_obj: Object as SpecificType<Mock_User | Mock_Cart>,
/**
 * 关联properties字段 测试
 */
MainComponent({
  properties: mock_properties,
  computed: {
    Cstr() {
      const { str } = this.data;

      Checking<string, typeof str, Test.Pass>;

      return str + "123";
    },
    Cnum() {
      const { num } = this.data;

      Checking<number, typeof num, Test.Pass>;

      return num + 10;
    },
    Cbool() {
      const { bool } = this.data;

      Checking<boolean, typeof bool, Test.Pass>;

      return this.data.bool;
    },
    Carr() {
      const { arr } = this.data;

      Checking<unknown[], typeof arr, Test.Pass>;

      return arr;
    },
    Cobj() {
      const { obj } = this.data;

      Checking<object | null, typeof obj, Test.Pass>;

      return this.data.obj;
    },
    Ctuple() {
      const { tuple } = this.data;

      Checking<[string, number, boolean], typeof tuple, Test.Pass>;

      return this.data.tuple[0];
    },
    CunionStr() {
      const { union_str } = this.data;

      Checking<"male" | "female", typeof union_str, Test.Pass>;

      return union_str;
    },
    CunionNum() {
      const { union_num } = this.data;

      Checking<0 | 1 | 2, typeof union_num, Test.Pass>;

      return union_num;
    },
    CunionBool() {
      const { union_bool } = this.data;

      Checking<false | true, typeof union_bool, Test.Pass>;

      return union_bool;
    },
    CunionArr() {
      const { union_arr } = this.data;

      Checking<number[] | string[], typeof union_arr, Test.Pass>;

      return union_arr;
    },
    CunionObj() {
      const { union_obj } = this.data;

      Checking<Mock_User | Mock_Cart | null, typeof union_obj, Test.Pass>;

      return union_obj;
    },
    CunionMultiple() {
      const { union_multiple } = this.data;

      Checking<string | number | boolean, typeof union_multiple, Test.Pass>;

      return union_multiple;
    },
    CunionMultipleLiteral() {
      const { union_multiple_literal } = this.data;

      Checking<boolean | 0 | 1 | "male" | "female" | 2, typeof union_multiple_literal, Test.Pass>;

      return union_multiple_literal;
    },
    CoptionalStr() {
      const { optional_str } = this.data;

      Checking<string, typeof optional_str, Test.Pass>;

      return optional_str;
    },
    CoptionalNum() {
      const { optional_num } = this.data;

      Checking<123 | 456, typeof optional_num, Test.Pass>;

      return optional_num;
    },
    CoptionalObj() {
      const { optional_obj } = this.data;

      Checking<Mock_User, typeof optional_obj, Test.Pass>;

      return optional_obj;
    },
  },
});

/**
 * 关联data字段 测试
 */
MainComponent({
  data: mock_data,
  computed: {
    Cstr() {
      const { str } = this.data;

      Checking<string, typeof str, Test.Pass>;

      return str + "123";
    },
    Cnum() {
      const { num } = this.data;

      Checking<number, typeof num, Test.Pass>;

      return num + 10;
    },
    CreactiveUserId() {
      const { reactiveUser } = this.data;

      Checking<Mock_User, typeof reactiveUser, Test.Pass>;

      return reactiveUser.id;
    },
  },
});

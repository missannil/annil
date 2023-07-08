import { ValueChecking } from "hry-types";
import { MainComponent } from "../..";

import type { AnyObject } from "hry-types";
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

      ValueChecking<string>()(str);

      return str + "123";
    },
    Cnum() {
      const { num } = this.data;

      ValueChecking<number>()(num);

      return num + 10;
    },
    Cbool() {
      const { bool } = this.data;

      ValueChecking<boolean>()(bool);

      return this.data.bool;
    },
    Carr() {
      const { arr } = this.data;

      ValueChecking<unknown[]>()(arr);

      return arr;
    },
    Cobj() {
      const { obj } = this.data;

      ValueChecking<AnyObject | null>()(obj);

      return this.data.obj;
    },
    Ctuple() {
      const { tuple } = this.data;

      ValueChecking<[string, number, boolean]>()(tuple);

      return this.data.tuple[0];
    },
    CunionStr() {
      const { union_str } = this.data;

      ValueChecking<"male" | "female">()(union_str);

      return union_str;
    },
    CunionNum() {
      const { union_num } = this.data;

      ValueChecking<0 | 1 | 2>()(union_num);

      return union_num;
    },
    CunionBool() {
      const { union_bool } = this.data;

      ValueChecking<false | true>()(union_bool);

      return union_bool;
    },
    CunionArr() {
      const { union_arr } = this.data;

      ValueChecking<number[] | string[]>()(union_arr);

      return union_arr;
    },
    CunionObj() {
      const { union_obj } = this.data;

      ValueChecking<Mock_User | Mock_Cart | null>()(union_obj);

      return union_obj;
    },
    CunionMultiple() {
      const { union_multiple } = this.data;

      ValueChecking<string | number | boolean>()(union_multiple);

      return union_multiple;
    },
    CunionMultipleLiteral() {
      const { union_multiple_literal } = this.data;

      ValueChecking<boolean | 0 | 1 | "male" | "female" | 2>()(union_multiple_literal);

      return union_multiple_literal;
    },
    CoptionalStr() {
      const { optional_str } = this.data;

      ValueChecking<string>()(optional_str);

      return optional_str;
    },
    CoptionalNum() {
      const { optional_num } = this.data;

      ValueChecking<123 | 456>()(optional_num);

      return optional_num;
    },
    CoptionalObj() {
      const { optional_obj } = this.data;

      ValueChecking<Mock_User>()(optional_obj);

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

      ValueChecking<string>()(str);

      return str + "123";
    },
    Cnum() {
      const { num } = this.data;

      ValueChecking<number>()(num);

      return num + 10;
    },
    CreactiveUserId() {
      const { reactiveUser } = this.data;

      ValueChecking<Mock_User>()(reactiveUser);

      return reactiveUser.id;
    },
  },
});

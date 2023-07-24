import { Checking, type Test } from "hry-types";
import { MainComponent } from "../..";
import { type Mock_Cart, mock_properties, type Mock_User } from "../../Properties/test/PropertiesConstraint.test";

MainComponent({
  properties: mock_properties,
  data: {
    Dstr: "str" as const,
    Dnum: 1,
    Dbool: true,
    Darr: [1, 2, 3],
    Dobj: { a: 1, b: 2 },
    reactive: () => 123,
  },
  computed: {
    Cstr() {
      return this.data.str + this.data.Dstr;
    },
    Cnum() {
      return this.data.num + this.data.Dnum;
    },
  },
  methods: {
    M1() {
      // properties fields
      Checking<string, typeof this.data.str, Test.Pass>;

      Checking<number, typeof this.data.num, Test.Pass>;

      Checking<boolean, typeof this.data.bool, Test.Pass>;

      Checking<unknown[], typeof this.data.arr, Test.Pass>;

      Checking<object | null, typeof this.data.obj, Test.Pass>;

      Checking<[string, number, boolean], typeof this.data.tuple, Test.Pass>;

      Checking<"male" | "female", typeof this.data.union_str, Test.Pass>;

      Checking<0 | 1 | 2, typeof this.data.union_num, Test.Pass>;

      Checking<false | true, typeof this.data.union_bool, Test.Pass>;

      Checking<number[] | string[], typeof this.data.union_arr, Test.Pass>;

      Checking<Mock_User | Mock_Cart | null, typeof this.data.union_obj, Test.Pass>;

      Checking<string | number | boolean, typeof this.data.union_multiple, Test.Pass>;

      Checking<boolean | 0 | "male" | "female" | 1 | 2, typeof this.data.union_multiple_literal, Test.Pass>;

      Checking<string, typeof this.data.optional_str, Test.Pass>;

      Checking<123 | 456, typeof this.data.optional_num, Test.Pass>;

      Checking<Mock_User, typeof this.data.optional_obj, Test.Pass>;

      Checking<string | number | boolean, typeof this.data.union_multiple, Test.Pass>;

      Checking<string | number | boolean, typeof this.data.union_multiple, Test.Pass>;
    },
  },
  lifetimes: {
    attached() {
      // data fields
      Checking<"str", typeof this.data.Dstr, Test.Pass>;

      Checking<number, typeof this.data.Dnum, Test.Pass>;

      Checking<boolean, typeof this.data.Dbool, Test.Pass>;

      Checking<number[], typeof this.data.Darr, Test.Pass>;

      Checking<123, typeof this.data.reactive, Test.Pass>;

      Checking<{ a: number; b: number }, typeof this.data.Dobj, Test.Pass>;
    },
  },
  pageLifetimes: {
    show() {
      // computed fields
      Checking<string, typeof this.data.Cstr, Test.Pass>;

      Checking<number, typeof this.data.Cnum, Test.Pass>;
    },
  },
});

// when data is empty
MainComponent({
  methods: {
    M1() {
      // @ts-expect-error 空data
      this.data.xxx;
    },
  },
});

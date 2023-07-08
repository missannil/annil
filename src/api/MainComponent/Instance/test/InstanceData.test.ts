import { ValueChecking } from "hry-types";
import type { AnyObject } from "hry-types";
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
      ValueChecking<string>()(this.data.str);

      ValueChecking<number>()(this.data.num);

      ValueChecking<boolean>()(this.data.bool);

      ValueChecking<unknown[]>()(this.data.arr);

      ValueChecking<AnyObject | null>()(this.data.obj);

      ValueChecking<[string, number, boolean]>()(this.data.tuple);

      ValueChecking<"male" | "female">()(this.data.union_str);

      ValueChecking<0 | 1 | 2>()(this.data.union_num);

      ValueChecking<false | true>()(this.data.union_bool);

      ValueChecking<number[] | string[]>()(this.data.union_arr);

      ValueChecking<Mock_User | Mock_Cart | null>()(this.data.union_obj);

      ValueChecking<string | number | boolean>()(this.data.union_multiple);

      ValueChecking<boolean | 0 | "male" | "female" | 1 | 2>()(this.data.union_multiple_literal);

      ValueChecking<string>()(this.data.optional_str);

      ValueChecking<123 | 456>()(this.data.optional_num);

      ValueChecking<Mock_User>()(this.data.optional_obj);

      ValueChecking<string | number | boolean>()(this.data.union_multiple);

      ValueChecking<string | number | boolean>()(this.data.union_multiple);
    },
  },
  lifetimes: {
    attached() {
      // data fields
      ValueChecking<"str">()(this.data.Dstr);

      ValueChecking<number>()(this.data.Dnum);

      ValueChecking<boolean>()(this.data.Dbool);

      ValueChecking<number[]>()(this.data.Darr);

      ValueChecking<123>()(this.data.reactive);

      ValueChecking<{ a: number; b: number }>()(this.data.Dobj);
    },
  },
  pageLifetimes: {
    show() {
      // computed fields
      ValueChecking<string>()(this.data.Cstr);

      ValueChecking<number>()(this.data.Cnum);
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

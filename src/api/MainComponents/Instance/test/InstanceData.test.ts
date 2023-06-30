import { type AnyObject, ValueChecking } from "hry-types";
import { MainComponent } from "../..";

MainComponent({
  properties: {
    str: String,
    num: Number,
    bool: Boolean,
    arr: Array,
    obj: Object,
  },
  data: {
    Dstr: "str",
    Dnum: 1,
    Dbool: true,
    Darr: [1, 2, 3],
    Dobj: { a: 1, b: 2 },
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
      ValueChecking<string>()(this.data.str);

      ValueChecking<number>()(this.data.num);

      ValueChecking<boolean>()(this.data.bool);

      ValueChecking<unknown[]>()(this.data.arr);

      ValueChecking<AnyObject | null>()(this.data.obj);
    },
  },
  lifetimes: {
    attached() {
      ValueChecking<string>()(this.data.Dstr);

      ValueChecking<number>()(this.data.Dnum);

      ValueChecking<boolean>()(this.data.Dbool);

      ValueChecking<number[]>()(this.data.Darr);

      ValueChecking<{ a: number; b: number }>()(this.data.Dobj);
    },
  },
  pageLifetimes: {
    show() {
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

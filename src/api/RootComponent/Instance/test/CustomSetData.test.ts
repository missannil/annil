import { RootComponent } from "../..";

RootComponent()({
  properties: {
    a: String,
  },
  data: {
    str: "str",
    num: 123,
    bool: true,
    arr: [1, 2, 3],
    obj: { a: 1, b: "str" },
    reactiveData: () => 123,
  },
  computed: {
    Cstr() {
      return this.data.str;
    },
  },
  methods: {
    M1() {
      this.setData({
        str: "string",
        num: 456,
        bool: false,
        arr: [1, 2, 3],
        obj: {
          a: 456,
          b: "str",
        },
        "obj.a": 456,
        "obj.b": "str",
        // @ts-expect-error 不可设置data中响应式数据
        reactiveData: 456,
      });
    },
    errField() {
      this.setData({
        // @ts-expect-error 不能设置不存在的字段
        "nonexistent": {},
      });
    },
  },
});

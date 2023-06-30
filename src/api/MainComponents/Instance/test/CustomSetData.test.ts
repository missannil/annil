import { MainComponent } from "../..";

MainComponent({
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
        num: 456 as number,
        bool: false as boolean,
        arr: [] as number[],
        obj: {
          a: 456 as number,
          b: "str" as string,
        },
        "obj.a": 456 as number,
        "obj.b": "str" as string,
        // @ts-expect-error 不能设置data中响应式数据
        reactiveData: 456 as number,
      });
    },
    errField() {
      this.setData({
        // @ts-expect-error 不能设置不存在的字段
        "otherFields": {} as any,
      });
    },
  },
});

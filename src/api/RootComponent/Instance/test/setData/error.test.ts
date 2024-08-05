import { RootComponent } from "../../..";

RootComponent()({
  properties: {
    Pobj: Object,
  },
  data: {
    str: "str",
    num: 123,
    literal: 456 as 456 | 789,
    bool: true,
    arr: [1, 2, 3],
    obj: { num: 1, str: "str" },
  },
  store: {
    Snum: () => 123,
  },
  computed: {
    Cnum() {
      return this.data.Snum;
    },
  },
  methods: {
    M1() {
      this.setData({
        // @ts-expect-error  不可对properties字段setData
        Pobj: {},
      });

      this.setData({
        // @ts-expect-error  不可对Store字段setData
        Snum: 123,
      });

      this.setData({
        // @ts-expect-error  不可对computed字段setData
        Cnum: 123,
      });

      // 对data字段set时有类型检查
      this.setData({
        // @ts-expect-error 类型错误 string
        str: 123,
        // @ts-expect-error 类型错误 number
        num: "str",
        // @ts-expect-error 类型错误  456 | 789
        literal: 123,
        // @ts-expect-error 类型错误 boolean
        bool: 123,
        // @ts-expect-error 类型错误 number[]
        arr: [1, 2, 3, "a"],
        obj: {
          // @ts-expect-error 类型错误 number
          num: "str",
          // @ts-expect-error 类型错误 number
          str: 123,
        },
        // @ts-expect-error 类型错误 number
        "obj.num": "str",
        // @ts-expect-error 类型错误 string
        "obj.str": 123,
      });
    },
  },
});

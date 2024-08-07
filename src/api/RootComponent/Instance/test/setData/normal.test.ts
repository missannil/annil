import { observable, runInAction } from "mobx";
import { RootComponent } from "../../..";

// 可以对data数据进行setData
RootComponent()({
  data: {
    str: "str",
    num: 123,
    literal: 456 as 456 | 789,
    bool: true,
    arr: [1, 2, 3],
    obj: { a: 1, b: "str" },
  },

  methods: {
    M1() {
      // 可以对data数据进行setData
      this.setData({
        str: "string",
        num: 456,
        bool: false,
        literal: 456,
        arr: [1, 2, 3],
        obj: {
          a: 456,
          b: "str",
        },
        "obj.a": 456,
        "obj.b": "str",
      });
    },
  },
});

const store = observable({
  name: "zhao",
  age: 20,
});

RootComponent()({
  store: {
    name: () => store.name,
  },
  lifetimes: {
    attached() {
      runInAction(() => {
        store.name = "liil";
      });
    },
  },
});

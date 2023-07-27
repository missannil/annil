import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type RootDoc = RootComponentDoc<{
  methods: {
    Mstr: () => string;
  };
  events: {
    Estr: () => string;
  };
  customEvents: {
    Cstr: string;
  };
}>;

type CompDoc = ComponentDoc<{
  customEvents: {
    aaa_str: string;
  };
}>;

// 默认可以为{}。
SubComponent<RootDoc, CompDoc>()({
  methods: {},
});

// methods字段可以写 任意字段函数,不与RootDoc和CompDoc中的方法字段重复即可,前缀为CompDoc的前缀
SubComponent<RootDoc, CompDoc>()({
  methods: {
    aaa_xxx() {},
    aaa_yyy() {},
    // ...
  },
});

import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type RootDoc = RootComponentDoc<{
  methods: {
    Mstr: () => string;
  };
}>;

type CompDoc = ComponentDoc<{
  customEvents: {
    aaa_str: string;
  };
}>;

// methods字段同组件前缀
SubComponent<RootDoc, CompDoc>()({
  methods: {
    aaa_xxx() {
      void 0;
    },
    aaa_yyy() {
      void 0;
    },
    // ...
  },
});

// 2 默认可以为{}。
SubComponent<RootDoc, CompDoc>()({
  methods: {},
});

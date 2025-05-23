import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import type { RootComponentType } from "../../../RootComponent/RootComponentType";
import { CustomComponent } from "../..";

type RootDoc = RootComponentType<{
  methods: {
    Mstr: () => string;
  };
}>;

type CompDoc = ComponentType<{
  customEvents: {
    aaa_str: string;
  };
}>;

// methods字段同组件前缀
CustomComponent<RootDoc, CompDoc>()({
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
CustomComponent<RootDoc, CompDoc>()({
  methods: {},
});

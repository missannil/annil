import type { MainComponentDoc } from "../../../../types/MainComponentDoc";
import { SubComponent } from "../..";

const Main = {
  methods: {
    str() {
      1;
    },
  },
} satisfies MainComponentDoc;

// 重复字段验证
SubComponent<typeof Main>()({
  methods: {
    num() {
      1;
    },
    // @ts-expect-error  "⚠️与主组件字段重复⚠️"
    str() {
      2;
    },
  },
});

import type { MainComponentDoc } from "../../../../types/MainComponentDoc";
import { SubComponent } from "../..";

const Main = {
  allData: {
    str: "123",
  },
} satisfies MainComponentDoc;

// 重复字段验证
SubComponent<typeof Main>()({
  properties: {
    num: Number,
    // @ts-expect-error  "⚠️与主组件字段重复⚠️"
    str: String,
  },
});

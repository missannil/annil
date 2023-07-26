import type { MainComponentDoc } from "../../../../types/MainComponentDoc";
import { SubComponent } from "../..";

// 1. 与主组件字段重复
const Main = {
  allData: {
    str: "123",
  },
} satisfies MainComponentDoc;

SubComponent<typeof Main, any>()({
  data: {
    num: Number,
    // @ts-expect-error  "⚠️与主组件字段重复⚠️"
    str: String,
  },
});

// 2. 与properties字段重复
SubComponent<{}>()({
  properties: {
    aaa: String,
  },
  computed: {
    xxx: () => 123, // ok
    // @ts-expect-error  "⚠️与properties字段重复⚠️"
    aaa: () => 123,
  },
});

// 3. 与data字段重复
SubComponent<{}>()({
  data: {
    aaa: String,
  },
  computed: {
    xxx: () => 123, // ok
    // @ts-expect-error  "⚠️与data字段重复⚠️"
    aaa: () => 123,
  },
});

import { RootComponent } from "../..";

/**
 * 字段重复
 */
RootComponent()({
  properties: {
    aaa: String,
  },
  data: {
    // @ts-expect-error 1 ⚠️与properties字段重复⚠️
    aaa: 123,
  },
});

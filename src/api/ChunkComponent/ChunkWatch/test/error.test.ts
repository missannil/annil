import type { User } from "../../../../../jest/computed/methodsOfPrototype/methodsOfPrototype.test";
import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "../../ChunkComputed/test/mock";

// 1. 没有对应字段报错
ChunkComponent<Mock_RootDoc, "zzz">()({
  watch: {
    // @ts-expect-error 没有对应字段报错
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    xxx() {},
  },
});
// 2. 不可以watch含有null类型对象的子字段
ChunkComponent<{ data: { user: User | null } }, "zzz">()({
  watch: {
    user(newValue, oldValue) {
      void oldValue;
      void newValue;
    },
    // @ts-expect-error 不能watch子字段 因为user可能为null
    "user.name"(newValue, oldValue) {
      void oldValue;
      void newValue;
    },
  },
});

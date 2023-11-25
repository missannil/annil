import type { V } from "hry-types";

export type SubStoreOption<TSubStore extends object, legalKeys extends PropertyKey, TPrefix extends string> = {
  store?:
    & TSubStore
    & V.IllegalFieldValidator<
      TSubStore,
      legalKeys | `_${TPrefix}_${string}`,
      0,
      "",
      "⚠️ 子组件无需此字段或为字段重复 ⚠️"
    >;
};

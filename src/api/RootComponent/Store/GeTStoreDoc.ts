import type { StoreConstraint } from "./StoreConstraint";

export type GetStoreDoc<TStore extends StoreConstraint> = { [k in keyof TStore]: ReturnType<TStore[k]> };

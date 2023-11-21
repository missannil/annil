import type { StoreConstraint } from "./StoreConstraint";

export type GeTStoreDoc<TStore extends StoreConstraint> = { [k in keyof TStore]: ReturnType<TStore[k]> };

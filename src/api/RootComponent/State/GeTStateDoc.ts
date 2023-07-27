import type { StateConstraint } from "./StateConstraint";

export type GeTStateDoc<TState extends StateConstraint> = { [k in keyof TState]: ReturnType<TState[k]> };

import type { CreateComponentDoc } from "../src/index";

export interface User {
  name: string;
  age?: number;
}

export type CompDoc = CreateComponentDoc<
  "compA",
  { properties: { num: number; user?: User | null }; events: { str: string } }
>;

export const user: User = { name: "lili", age: 30 };

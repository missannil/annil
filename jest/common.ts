import type { ComponentDoc } from "../src/api/DefineComponent/ReturnType/ComponentDoc";

export type User = { name: string; age?: number };

export type CompDoc = ComponentDoc<
  { properties: { compA_num: number; compA_user?: User | null }; customEvents: { compA_str: string } }
>;

export const user: User = { name: "lili", age: 30 };

import type { ComponentDoc } from "../src/api/DefineComponent/returnType/ComponentDoc";

export interface User {
  name: string;
  age?: number;
}

export type CompDoc = ComponentDoc<
  { properties: { compA_num: number; compA_user?: User | null }; events: { compA_str: string } }
>;

export const user: User = { name: "lili", age: 30 };

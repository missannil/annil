import type { ComponentType } from "../src/api/DefineComponent/ReturnType/ComponentType";

export interface User {
  name: string;
  age?: number;
}

export type CompDoc = ComponentType<
  { properties: { compA_num: number; compA_user?: User | null }; customEvents: { compA_str: string } }
>;

export const user: User = { name: "lili", age: 30 };

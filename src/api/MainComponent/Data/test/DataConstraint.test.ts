import type { Mock_User } from "../../Properties/test/PropertiesConstraint.test";
import type { DataConstraint } from "../DataConstraint";

export const mock_data = {
  reactiveUser: () => ({} as Mock_User),
  num: 2,
  str: "str",
} satisfies DataConstraint;

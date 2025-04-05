import { CustomComponent, DefineComponent } from "../../src";

const subA = CustomComponent<{}, { properties: { aaa_num: number } }>()({
  data: {
    aaa_num: 123,
  },
});
const subA2 = CustomComponent<{}, { properties: { aaa_num: number } }, "2">()({
  data: {
    aaa2_num: 123,
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const compA = DefineComponent({
  name: "compA",

  subComponents: [subA, subA2],
});
export type $CompA = typeof compA;

import { DefineComponent, SubComponent } from "../../src";

const subA = SubComponent<{}, { properties: { aaa_num: number } }>()({
  data: {
    aaa_num: 123,
  },
});
const subA2 = SubComponent<{}, { properties: { aaa_num: number } }, "2">()({
  data: {
    aaa2_num: 123,
  },
});
const compA = DefineComponent({
  name: "compA",

  subComponents: [subA, subA2],
});
export type $CompA = typeof compA;

import type { RootComponentType } from "../../../RootComponent/RootComponentType";

export type Mock_RootDoc = RootComponentType<{
  properties: {
    required_num: number;
    optional_literal_num?: 123 | 456 | 789;
    unionStrNum: string | number;
    required_obj: object | null;
    optional_obj?: object | null;
    slot_num: number;
    _slot_str: string;
  };
  data: {
    str: string;
    literal_str: "a" | "b" | "c";
    bool: boolean;
  };
  computed: {
    Cuinon: string | boolean;
  };
}>;

export type Mock_SubDoc = {
  allDatas: {
    aaa_num: number;
    aaa_literal_num: 123 | 456;
    aaa_str?: string;
    aaa_union: string | boolean;
    aaa_obj: object | null;
    aaa_obj1?: object | null;
  };
};

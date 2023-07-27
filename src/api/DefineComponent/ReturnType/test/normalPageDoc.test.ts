import { Checking, type Test } from "hry-types";
import { RootComponent, type SpecificType } from "../../../..";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { DefineComponent } from "../..";

const OnlyPropsRootDoc = RootComponent()({
  isPage: true,
  properties: {
    str: String,
    obj: Object as SpecificType<Mock_User>,
    optionalObj: {
      type: Object as SpecificType<Mock_User>,
      value: {} as Mock_User,
    },
    optionalObjOrNull: {
      type: Object as SpecificType<Mock_User | null>,
      value: null,
    },
  },
  customEvents: {}, // EmptyObject
});

const compDocOnlyProperties = DefineComponent({
  path: "/pages/index/index",
  rootComponent: OnlyPropsRootDoc,
});

// 页面时返回的propertiesDoc无前缀,必传对象无null类型。
type CompDocOnlyPropertiesExpected = {
  path: "/pages/index/index";
  properties: {
    optionalObj?: Mock_User;
    optionalObjOrNull?: Mock_User | null;
    str: string;
    obj: Mock_User; // 去除了 OnlyPropsRootDoc加入的null
  };
};

Checking<typeof compDocOnlyProperties, CompDocOnlyPropertiesExpected, Test.Pass>;

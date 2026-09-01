/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DetailedType, RootComponent } from "../../../..";
import { typeEqual } from "../../../../utils/typeEqual";

import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { DefineComponent } from "../..";

const OnlyPropsRootDoc = RootComponent()({
  isPage: true,
  properties: {
    str: String,
    obj: Object as DetailedType<Mock_User>,
    optionalObj: {
      type: Object as DetailedType<Mock_User>,
      value: {} as Mock_User,
    },
    optionalObjOrNull: {
      type: Object as DetailedType<Mock_User | null>,
      value: null,
    },
  },
});

const compDocOnlyProperties = DefineComponent({
  path: "/pages/index/index",
  rootComponent: OnlyPropsRootDoc,
});

// 1 页面时返回的propertiesDoc无前缀
type CompDocOnlyPropertiesExpected = {
  path: "/pages/index/index";
  properties: {
    optionalObj?: Mock_User;
    optionalObjOrNull?: Mock_User | null;
    str: string;
    obj: Mock_User;
  };
};

void typeEqual<typeof compDocOnlyProperties, CompDocOnlyPropertiesExpected>;

// 2 页面类型不受subComponents是[never,never]时影响
const whenSubIsAllNever = DefineComponent({
  path: "/pages/index/index",
  rootComponent: OnlyPropsRootDoc,
  subComponents: [{} as never, {} as never],
});

void typeEqual<typeof whenSubIsAllNever, CompDocOnlyPropertiesExpected>;

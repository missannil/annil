// const chunk = ChunkComponent<WithDefaultRoot>()({})

import { DefineComponent } from "../../../../src/api/DefineComponent/index";
import { RootComponent } from "../../../../src/api/RootComponent/index";
import { ChunkComponent, CustomComponent, type DetailedType } from "../../../../src/index";
import { typeEqual } from "../../../../src/utils/_utils";
import { allUser, type User } from "./withDefault.test";

const chunk = ChunkComponent<WithDefaultRoot>()({
  store: {
    chunkuserAList: (data) => allUser[data.userIdA],
    chunkuserBAge: {
      getter: (data) => allUser[data.userIdB][0].age,
      default: 0,
    },
    _chunkuserC: {
      getter: (data) => allUser[data.userIdC]?.[0],
      default: null,
    },
  },
});

const custom = CustomComponent<WithDefaultRoot, { properties: { aaa_userAList: User[] } }>()({
  store: {
    aaa_userAList: (data) => allUser[data.userIdA],
    _aaa_userBAge: {
      getter: (data) => allUser[data.userIdB][0].age,
      default: 0,
    },
    _aaa_userC: {
      getter: (data) => allUser[data.userIdC],
      default: [],
    },
  },
});
export type WithDefaultRoot = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    userIdA: String as DetailedType<"groupA">,
    userIdB: String as DetailedType<"groupB">,
    userIdC: String as DetailedType<"groupC">,
  },
  store: {
    rootuserAList: (data) => allUser[data.userIdA],
    rootuserBAge: {
      getter: (data) => allUser[data.userIdB][0].age,
      default: 0,
    },
    rootuserC: {
      getter: (data) => allUser[data.userIdC]?.[0],
      default: null,
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withDefault = DefineComponent({
  name: "withDefault",
  rootComponent,
  subComponents: [chunk, custom],
});
export type $WithDefault = {
  properties: {
    withDefault_userIdA: "groupA";
    withDefault_userIdB: "groupB";
    withDefault_userIdC: "groupC";
  };
};
typeEqual<$WithDefault, typeof withDefault>();

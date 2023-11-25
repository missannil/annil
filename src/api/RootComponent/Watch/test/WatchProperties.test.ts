import { Checking, type Test } from "hry-types";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import { RootComponent } from "../..";

import type { SpecificType } from "../../../..";
import {
  type Mock_Cart,
  mock_requiredTypes,
  mock_requiredUnion,
  type Mock_User,
} from "../../Properties/expected/normalRequired";
import type { OptionalType } from "../../Properties/PropertiesConstraint";
const mock_optional = {
  optional_num: {
    type: Number,
    value: 123,
  },
  optional_gender: {
    type: String as SpecificType<"male" | "female">,
    value: "male" as const,
  },
  optional_obj: {
    type: Object as SpecificType<Mock_User>,
    value: {
      id: "id",
      name: "name",
      age: 20,
    },
  },
  optional_objOrNull: {
    type: Object as SpecificType<Mock_User | null>, // 可选类型定义null默认值方可为null
    value: null,
  },
} satisfies Record<string, OptionalType>;

/**
 * watch properties字段 深度只读, 必传对象字段newValue去除null
 */
RootComponent()({
  properties: {
    ...mock_requiredTypes,
    ...mock_requiredUnion,
    ...mock_optional,
  },
  watch: {
    // 必传单一字段
    str(newValue, oldValue) {
      Checking<string, typeof newValue, Test.Pass>;

      Checking<string, typeof oldValue, Test.Pass>;
    },
    num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    bool(newValue, oldValue) {
      Checking<boolean, typeof newValue, Test.Pass>;

      Checking<boolean, typeof oldValue, Test.Pass>;
    },
    arr(newValue, oldValue) {
      newValue; // readonly ReadonlyDeep<unknown>[]

      oldValue; // readonly ReadonlyDeep<unknown>[]

      // ts中很多不是错误的错误,写 typeof newValue 结果是错误
      Checking<unknown[], typeof newValue, Test.Fail>;

      // ts中很多不是错误的错误,写 readonly ReadonlyDeep<unknown>[] 结果是正确的
      Checking<readonly unknown[], readonly ReadonlyDeep<unknown>[], Test.Pass>;
    },
    obj(newValue, oldValue) {
      Checking<object, typeof newValue, Test.Pass>;

      Checking<object | null, typeof oldValue, Test.Pass>;
    },
    tuple(newValue, oldValue) {
      Checking<readonly [string, number, boolean], typeof newValue, Test.Pass>;

      Checking<readonly [string, number, boolean], typeof oldValue, Test.Pass>;
    },
    union_str(newValue, oldValue) {
      Checking<"male" | "female", typeof newValue, Test.Pass>;

      Checking<"male" | "female", typeof oldValue, Test.Pass>;
    },
    union_num(newValue, oldValue) {
      Checking<0 | 1 | 2, typeof newValue, Test.Pass>;

      Checking<0 | 1 | 2, typeof oldValue, Test.Pass>;
    },
    union_bool(newValue, oldValue) {
      Checking<false | true, typeof newValue, Test.Pass>;

      Checking<false | true, typeof oldValue, Test.Pass>;
    },
    union_arr(newValue, oldValue) {
      Checking<readonly number[] | readonly string[], typeof newValue, Test.Pass>;

      Checking<readonly number[] | readonly string[], typeof oldValue, Test.Pass>;
    },
    union_obj(newValue, oldValue) {
      Checking<ReadonlyDeep<Mock_User | Mock_Cart>, typeof newValue, Test.Pass>;

      Checking<ReadonlyDeep<Mock_User | Mock_Cart | null>, typeof oldValue, Test.Pass>;
    },
    // 必传多类型联合
    union_str_num_bool(newValue, oldValue) {
      Checking<string | number | boolean, typeof newValue, Test.Pass>;

      Checking<string | number | boolean, typeof oldValue, Test.Pass>;
    },
    union_literalStr_Literalnum(newValue, oldValue) {
      Checking<0 | 1 | 2 | "male" | "female", typeof newValue, Test.Pass>;

      Checking<0 | 1 | 2 | "male" | "female", typeof oldValue, Test.Pass>;
    },
    union_mockUser_num(newValue, oldValue) {
      Checking<ReadonlyDeep<number | Mock_User>, typeof newValue, Test.Pass>;

      Checking<ReadonlyDeep<number | Mock_User | null>, typeof oldValue, Test.Pass>;
    },
    // 可选字段
    optional_gender(newValue, oldValue) {
      Checking<"male" | "female", typeof newValue, Test.Pass>;

      Checking<"male" | "female", typeof oldValue, Test.Pass>;
    },
    optional_num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    optional_obj(newValue, oldValue) {
      Checking<ReadonlyDeep<Mock_User>, typeof newValue, Test.Pass>;

      Checking<ReadonlyDeep<Mock_User> | null, typeof oldValue, Test.Pass>;
    },
    // 对象的二段key
    "optional_obj.age"(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number | undefined, typeof oldValue, Test.Pass>;
    },
    "optional_obj.id"(newValue, oldValue) {
      Checking<string, typeof newValue, Test.Pass>;

      Checking<string, typeof oldValue, Test.Pass>;
    },

    "optional_objOrNull.age"() {
    },
  },
});

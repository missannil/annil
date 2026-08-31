import type { DetailedType } from "../../../..";
import { typeEqual } from "../../../../utils/typeEqual";
import { RootComponent } from "../..";
import type { OptionalType } from "../../Properties/PropertiesConstraint";
import {
  type Mock_Cart,
  mock_requiredTypes,
  mock_requiredUnion,
  type Mock_User,
} from "../../Properties/test/normalRequired.test";
const mock_optional = {
  optional_num: {
    type: Number,
    value: 123,
  },
  optional_gender: {
    type: String as DetailedType<"male" | "female">,
    value: "male" as const,
  },
  optional_obj: {
    type: Object as DetailedType<Mock_User>,
    value: {
      id: "id",
      name: "name",
      age: 20,
    },
  },
  optional_objOrNull: {
    type: Object as DetailedType<Mock_User | null>,
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
      void oldValue;
      void typeEqual<string, typeof newValue>;

      void typeEqual<string, typeof oldValue>;
    },
    num(newValue, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    bool(newValue, oldValue) {
      void oldValue;
      void typeEqual<boolean, typeof newValue>;

      void typeEqual<boolean, typeof oldValue>;
    },

    obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<object, typeof newValue>;

      void typeEqual<object, typeof oldValue>;
    },
    tuple(newValue, oldValue) {
      void oldValue;
      void typeEqual<[string, number, boolean], typeof newValue>;

      void typeEqual<[string, number, boolean], typeof oldValue>;
    },
    union_str(newValue, oldValue) {
      void oldValue;
      void typeEqual<"male" | "female", typeof newValue>;

      void typeEqual<"male" | "female", typeof oldValue>;
    },
    union_num(newValue, oldValue) {
      void oldValue;
      void typeEqual<0 | 1 | 2, typeof newValue>;

      void typeEqual<0 | 1 | 2, typeof oldValue>;
    },
    union_bool(newValue, oldValue) {
      void oldValue;
      void typeEqual<false | true, typeof newValue>;

      void typeEqual<false | true, typeof oldValue>;
    },
    union_arr(newValue, oldValue) {
      void oldValue;
      void typeEqual<number[] | string[], typeof newValue>;

      void typeEqual<number[] | string[], typeof oldValue>;
    },
    union_obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User | Mock_Cart, typeof newValue>;

      void typeEqual<Mock_User | Mock_Cart, typeof oldValue>;
    },
    // 必传多类型联合
    union_str_num_bool(newValue, oldValue) {
      void oldValue;
      void typeEqual<string | number | boolean, typeof newValue>;

      void typeEqual<string | number | boolean, typeof oldValue>;
    },
    union_literalStr_Literalnum(newValue, oldValue) {
      void oldValue;
      void typeEqual<0 | 1 | 2 | "male" | "female", typeof newValue>;

      void typeEqual<0 | 1 | 2 | "male" | "female", typeof oldValue>;
    },
    union_mockUser_num(newValue, oldValue) {
      void oldValue;
      void typeEqual<number | Mock_User, typeof newValue>;

      void typeEqual<number | Mock_User, typeof oldValue>;
    },
    // 可选字段
    optional_gender(newValue, oldValue) {
      void oldValue;
      void typeEqual<"male" | "female", typeof newValue>;

      void typeEqual<"male" | "female", typeof oldValue>;
    },
    optional_num(newValue, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    optional_obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User, typeof newValue>;

      void typeEqual<Mock_User, typeof oldValue>;
    },
    // 对象的二段key
    "optional_obj.age"(newValue, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number | undefined, typeof oldValue>;
    },
    "optional_obj.**"(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User, typeof newValue>;

      void typeEqual<Mock_User, typeof oldValue>;
    },
    "optional_obj.id"(newValue, oldValue) {
      void oldValue;
      void typeEqual<string, typeof newValue>;

      void typeEqual<string, typeof oldValue>;
    },
    optional_objOrNull(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User | null, typeof newValue>;

      void typeEqual<Mock_User | null, typeof oldValue>;
    },
  },
});

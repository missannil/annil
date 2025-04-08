import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import type { RootComponentType } from "../../../RootComponent/RootComponentType";
import { CustomComponent } from "../..";

type RootDoc = RootComponentType<{
  properties: {
    obj: Mock_User | null;
  };
  data: {
    num: number;
  };
  store: {
    bool: boolean;
  };
}>;

type CompDoc = ComponentType<{
  properties: {
    aaa_obj: Mock_User | null;
    aaa_str: string;
    aaa_num: number;
    aaa_bool: boolean;
  };
}>;

/**
 *  watch computed字段时需要手写类型,可悬停鼠标到key查看类型
 */
CustomComponent<RootDoc, CompDoc>()({
  computed: {
    aaa_str(): string {
      return this.data.aaa_num.toString();
    },
    aaa_num(): number {
      return 123;
    },
    aaa_bool(): boolean {
      return this.data.bool;
    },
    aaa_obj(): Mock_User {
      return {} as Mock_User;
    },
  },
  watch: {
    aaa_num(newValue: number, oldValue: number) {
      void oldValue;
      Checking<number, typeof newValue, Test.Pass>();

      Checking<number, typeof oldValue, Test.Pass>();
    },
    aaa_str(newValue: string, oldValue: string) {
      void oldValue;
      Checking<string, typeof newValue, Test.Pass>();

      Checking<string, typeof oldValue, Test.Pass>();
    },
    aaa_bool(newValue: boolean, oldValue: boolean) {
      void oldValue;
      Checking<boolean, typeof newValue, Test.Pass>();

      Checking<boolean, typeof oldValue, Test.Pass>();
    },
    aaa_obj(newValue: Mock_User, oldValue: Mock_User | null) {
      void oldValue;
      Checking<Mock_User, typeof newValue, Test.Pass>();

      Checking<Mock_User | null, typeof oldValue, Test.Pass>();
    },
    "aaa_obj.**"(newValue: Mock_User, oldValue: Mock_User | null) {
      void oldValue;
      Checking<Mock_User, typeof newValue, Test.Pass>();

      Checking<Mock_User | null, typeof oldValue, Test.Pass>();
    },
    "aaa_obj.id"(newValue: string, oldValue: string) {
      void oldValue;
      Checking<string, typeof newValue, Test.Pass>();

      Checking<string, typeof oldValue, Test.Pass>();
    },
    "aaa_obj.age"(newValue: number, oldValue: number) {
      void oldValue;
      Checking<number, typeof newValue, Test.Pass>();

      Checking<number, typeof oldValue, Test.Pass>();
    },
  },
});

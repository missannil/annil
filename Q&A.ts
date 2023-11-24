// 泛型约束的一些特性

import type { Func } from "hry-types/src/Misc/Func";

/**
 * 1. 泛型无默认值有字段提示
 */
declare function foo<T extends Partial<{ str: string; num: number; bool: boolean }>>(opts: T): void;

foo({
  str: "str",
  // 键入n有字段提示num
});

/**
 * 2. 泛型有默认值,只有首key类型提示
 */
declare function foo1<T extends Partial<{ str: string; num: number; bool: boolean }> = {}>(opts: T): void;

foo1({
  bool: false, // 首key,有字段提示,即输入b,提示bool
  // 键入n无字段提示num
});

type ValueIsFunc = Record<string, Func>;
/**
 * 3. 泛型字段为`ValueIsFunc`时,若要通过this相互间引用且实现自动类型推导,需要加默认值。(不加默认值需手动声明返回类型)
 */

declare function foo2<
  TComputed extends ValueIsFunc = {},
  ComputedReturnType = { [k in keyof TComputed]: ReturnType<TComputed[k]> },
>(
  obj: {
    computed: TComputed;
  } & ThisType<ComputedReturnType>,
): void;

foo2({
  computed: {
    str() {
      return "a";
    },
    bool() {
      return !!this.str; // 去除 `TComputed extends ValueIsFunc = {}`的默认值`{}`, str为any
    },
  },
});

type Obj = {
  Cuser: User;
  Cstr: string;
  Cnum: number;
  CliteralNum: 123;
};

type User = {
  name: string;
  age: number;
};

/**
 * 4. TComputed有具体字段约束时,相互引用会报错,要显示声明返回类型    采取这个方法写计算属性。
 */
declare function foo3<
  TComputed extends { [k in keyof Obj]?: () => Obj[k] },
  ComputedReturnType = { [k in keyof TComputed]: TComputed[k] extends Func ? ReturnType<TComputed[k]> : never },
>(
  obj: {
    computed: TComputed;
  } & ThisType<ComputedReturnType & { user: User }>,
): void;

foo3({
  computed: {
    Cuser(): User {
      return this.user;
    },
    Cnum(): number {
      return this.Cuser.age;
    },
    Cstr(): string {
      return this.user.name;
    },
    CliteralNum() {
      return 123;
    },
    name() {
      return this.user.name; // 没有引用到其他计算属性且没被其他计算属性引用,可以不显示声明返回类型。
    },
  },
});

type validatorOfKey<
  TComputed extends object,
  TCompare extends Record<PropertyKey, any>,
> = {
  [
    k in keyof TComputed as k extends keyof TCompare ? never : k
  ]: `⚠ The field is incorrect ⚠`;
};

type validatorOfValue<TComputed extends object, TCompare extends Record<PropertyKey, any>> = {
  [
    k in keyof TComputed as TComputed[k] extends (() => TCompare[k]) ? never : k
  ]: `⚠ The value is incorrect ⚠`;
};

/**
 * 5. 通过验证key和value验证器,没有提示,又时需要加const,还要显示声明返回类型。不如4
 */
declare function foo4<
  TComputed extends ValueIsFunc = {},
  ComputedReturnType extends object = {
    [k in keyof TComputed]: TComputed[k] extends Func ? ReturnType<TComputed[k]> : never;
  },
>(
  obj: {
    computed: TComputed & validatorOfKey<TComputed, Obj> & validatorOfValue<TComputed, Obj>;
  } & ThisType<ComputedReturnType & { user: User }>,
): void;

foo4({
  computed: {
    Cuser(): User {
      return this.user;
    },
    // @ts-expect-error 类型错误 name 是string
    Cstr(): number {
      return this.user.age;
    },
    CliteralNum() {
      return 123 as const;
    },
    // @ts-expect-error 超出字段
    xxx() {
      return 123;
    },
  },
});

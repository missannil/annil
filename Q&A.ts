// computed字段的一些特性
/**
 * 1. 泛型无默认值有字段提示
 */
function foo<T extends Partial<{ str: string; num: number; bool: boolean }>>(obj: T) {
  obj;
}

foo({
  str: "str",
  // 键入n有字段提示num
});

/**
 * 2. 泛型有默认值,只有首key类型提示
 */
function foo1<T extends Partial<{ str: string; num: number; bool: boolean }> = {}>(obj: T) {
  obj;
}

foo1({
  bool: false, // 首key,有字段提示,即输入b,提示bool
  // 键入n无字段提示num
});

type Options<TComputed, ComputedReturnType> = {
  computed: TComputed;
} & ThisType<{ data: ComputedReturnType }>;

/**
 * 3. 泛型字段为`Record<string, () => void>`时,若要通过this相互间引用,需要加默认值。
 */
function foo2<
  TComputed extends Record<string, () => void> = {},
  ComputedReturnType extends object = { [k in keyof TComputed]: ReturnType<TComputed[k]> },
>(
  obj: Options<TComputed, ComputedReturnType>,
): ComputedReturnType {
  obj;

  return {} as any;
}

foo2({
  computed: {
    str() {
      return "a";
    },
    bool() {
      return this.data.str;
    },
  },
});

type Obj = {
  str: string;
  num: number;
  literalNum: 123;
};

/**
 * 4. TComputed约束有具体字段时,不允许相互依赖(且返回字面量需要加上const才可以(如num),且没有第二字段提示)。
 */
function foo3<
  TComputed extends { [k in keyof Obj]?: () => Obj[k] } = {},
  // @ts-ignore 忽略ReturnType<TComputed[k]>报错
  ComputedReturnType extends object = { [k in keyof TComputed]: ReturnType<TComputed[k]> },
>(
  obj: Options<TComputed, ComputedReturnType>,
): ComputedReturnType {
  obj;

  return {} as any;
}

foo3({
  computed: {
    str() {
      return "b";
    },
    xxx() {
      return 123;
    },
    literalNum() {
      return 123 as const; // 需要加const
    },
    _aaa_other() { // 非约束字段可引用其他字段。
      return this.data.str;
    },
  },
});

foo3({
  computed: {
    str() {
      return "123";
    },
    // @ts-ignore num 不允许依赖xxx
    num() {
      // @ts-ignore num 不允许依赖xxx
      return +this.data.str;
    },
  },
});

// 最终解决方案
type ComputedConstraint = Record<string, () => any>;

type Validator1<TComputed extends ComputedConstraint, TObj extends Record<PropertyKey, any>> = {
  [
    k in keyof TComputed as k extends keyof TObj ? never : k
  ]: "多余字段";
};

type OptionAA<
  TComputed extends ComputedConstraint,
  TObj extends Record<string, any>,
  ComputedReturnType,
> = {
  computed?:
    & TComputed
    & ValidatorOfReturnType<TComputed, TObj>
    & Validator1<TComputed, TObj>;
} & ThisType<{ data: ComputeObj<ComputedReturnType & { aaa: number; bbb: string }> }>;

export type ValidatorOfReturnType<TComputed, TCompare extends Record<PropertyKey, unknown>> = {
  [
    k in keyof TComputed as TComputed[k] extends (() => TCompare[k]) ? never : k
  ]: "类型错误";
};

type getReturnType<T extends Record<string, () => any>> = { [k in keyof T]: ReturnType<T[k]> };

function foo4<
  TComputed extends ComputedConstraint = {},
  ComputedReturnType = getReturnType<TComputed>,
>(
  obj: OptionAA<TComputed, Obj, ComputedReturnType>,
): void {
  obj;

  return {} as any;
}

type ComputeObj<T> = T extends unknown ? { [k in keyof T]: T[k] } : never;

// 正常写法
foo4({
  computed: {
    str() {
      return this.data.bbb;
    },
    num() {
      return +this.data.str;
    },
  },
});

// 类型错误
foo4({
  computed: {
    // @ts-expect-error 类型错误
    num() {
      return "123";
    },
  },
});

foo4({
  computed: {
    // @ts-ignore 多余字段
    xxx() {
      return 444;
    },
  },
});

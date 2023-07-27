/**
 * 1. 泛型无默认值有字段提示,提升全
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
  computed: TComputed & ThisType<{ data: ComputedReturnType }>;
};

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
 * 4. 接上 TComputed约束有具体字段时,返回字面量需要加上const才可以(如num),且没有第二字段提示,且不可以相互this引用。
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
    literalNum() {
      return 123 as const; // 需要加const
    },
    _aaa_other() { // 任意字段可以引用存在字段。
      return this.data.str;
    },
    num() {
      return 123;
    },
  },
});

foo3({
  computed: {
    _aaa_other() {
      return 123;
    },
    // @ts-expect-error 存在字段不可以引用其他字段
    num() {
      // @ts-expect-error 存在字段不可以引用其他字段
      return this.data._aaa_other;
    },
  },
});

// type Validator<TComputed, TObj, > = { [k in keyof TComputed as ReturnType<TComputed[k]> extends TObj[k]?never:k]:()=> TObj[k]};

// type Option<TComputed, ComputedReturnType, TObj> = {
//   computed?:
//     & TComputed
//     & ThisType<{ data: ComputedReturnType }>
//     & Validator< TComputed, TObj>;
// };

// //
// function foo4<
//   TComputed extends Record<string, () => any> = {},
//   // @ts-ignore 忽略ReturnType<TComputed[k]>报错
//   ComputedReturnType extends object = { [k in keyof TComputed]: ReturnType<TComputed[k]> },
// >(
//   obj: Option<TComputed, ComputedReturnType, Obj>,
// ): ComputedReturnType {
//   obj;

//   return {} as any;
// }

// const aaa = foo4({
//   computed: {
//     num() {
//       return 123;
//     },
//     str() {
//       return 123;
//     },

//   },
// });

// RootComponent({
//   properties: {
//     aaa: {
//       type: String,
//       value: 123,
//     },
//     bbb: {
//       type: Number,
//       value: "123",
//     },
//   },
// });

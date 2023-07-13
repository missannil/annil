import { MainComponent, type SpecificType } from "../../../..";
import type { Mock_User } from "../../../MainComponent/Properties/test/PropertiesConstraint.test";
import { SubComponent } from "../..";
export type Main = typeof mainComponent;

const mainComponent = MainComponent({
  properties: {
    Pstr: String,
    requiredObj: Object as SpecificType<Mock_User>,
    optionalObj: {
      type: Object as SpecificType<Mock_User>,
      value: { id: "", name: "zhao" },
    },
  },
  data: {
    dataNum: 123,
    literal: "string" as const,
  },
  customEvents: {
    customA: String,
  },
  methods: {
    mainM1(e: string) {
      console.log(e);
    },
  },
  events: {
    mainEventA(e) {
      console.log(e);
    },
  },
});

// 测试1
/**
 * 约束: key继承 TComponentDoc["properties"] 值加入函数返回类型
 * 公共验证: 重复验证(properties & mainDoc['allData'] & inherit & 注入的data)
 */
SubComponent<Main, any, "">()({
  properties: {
    xxx: String,
  },

  data: {
    standard: "123",
    _num: 123,
    responsive: () => 123,
    // @ts-expect-error ⚠️与主数据字段重复⚠️
    Pstr: 123,
    // @ts-expect-error ⚠️与properties字段重复⚠️
    xxx: "",
    // @ts-expect-error ⚠️与inherit字段重复⚠️
    yyy: "",
    // @ts-expect-error ⚠️与注入的data字段重复⚠️
    injectStr: 123,
  },
});

/**
 * test1 componentDoc 为{}时 all 前缀验证
 * 增加
 */
SubComponent<Main, {}, "aaa">()({
  data: {
    // @ts-expect-error "⚠️此字段要求前缀为 aaa | _aaa ⚠️"
    _xxx: 123,
    // @ts-expect-error "⚠️此字段要求前缀为 aaa | _aaa ⚠️"
    aa_xx: 123,
    _aaa_xxx: 123,
    aaa_yyy: 123,
  },
});

/**
 * doc 仅有customEvents字段时(即无properties字段)
 * 验证:增加'inner'前缀验证 确保只可以书写内部字段
 */
SubComponent<object, mockComponentDocOnlyCustomEvents, "aaa">()({
  data: {
    _eventAaa_xxx: 123,
    // @ts-expect-error "⚠️此字段要求前缀为 _eventAaa ⚠️"
    eventAaa_xxx: "string",
  },
});

/**
 * 组件有properties字段时
 * 验证:增加标准字段超出字段验证、值类型验证、内部字段前缀验证
 */
SubComponent<object, mockComponentDocOnlyPropertiesHasPrefix>()({
  data: {
    kkk_str: "123",
    // @ts-expect-error "⚠️() => "类型错误"⚠️"
    kkk_arr: "123",
    // @ts-expect-error "⚠️()=> 超出文档字段范围⚠️"
    kkk_xxx: 123,
    // @ts-expect-error "⚠️()=> 此字段要求前缀为  _kkk ⚠️"
    _kkkxx_xxx: 123,
    _kkk_xxx: 123, // ok
  },
});

/**
 * data 可以只写一个内部字段不报错,因为约束联合了{ [k in `_${FullPrefix}_${string}`]: unknown } 也因此增加了值类型的判断
 */
SubComponent<object, mockComponentDocOnlyPropertiesHasPrefix>()({
  data: {
    _kkk_num: 123,
  },
});

// 字段提示
SubComponent<object, mockComponentDocOnlyPropertiesHasPrefix>()({
  data: {
    kkk_arr: [],
    kkk_bool: false,
  },
});

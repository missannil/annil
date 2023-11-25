// import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
// import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
// import type { RootComponentDoc } from "../../../RootComponent/RetrunType/RootComponentDoc";

// type RootDoc = RootComponentDoc<{
//   properties: {
//     Pnum: number;
//     obj: Mock_User | null;
//   };
// }>;

// type CompDoc = ComponentDoc<{
//   properties: {
//     aaa_str: string;
//     aaa_num: number;
//   };
// }>;

/**
 *  测试 computed字段时需要手写类型,可悬停鼠标到key查看类型
 */
// SubComponent<RootDoc, CompDoc>()({
//   data: {
//     aaa_num: 123,
//   },
//   computed: {
//     _aaa_CNum() {
//       return this.data.Pnum + this.data.aaa_num;
//     },
//     aaa_str() {
//       return 123;
//     },
//   },
//   watch: {
//     _aaa_CNum(newValue: number, oldValue: number) {
//       Checking<number, typeof newValue, Test.Pass>;

//       Checking<number, typeof oldValue, Test.Pass>;
//     },
//     aaa_str(newValue: 123, oldValue: 123) {
//       Checking<123, typeof newValue, Test.Pass>;

//       Checking<123, typeof oldValue, Test.Pass>;
//     },
//   },
// });

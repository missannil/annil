export type SubData<TSubData extends object> = {
  data?: TSubData;
  // & ValidationRepeated<DataDoc, PropertiesDoc, () => "⚠️与properties字段重复⚠️">
  // & ValidationRepeated<DataDoc, Main["allData"], () => "⚠️与主数据字段重复⚠️">
  // & ValidationRepeated<DataDoc, InheritDoc, () => "⚠️与inherit字段重复⚠️">
  // & ValidationRepeatedInjectData<DataDoc>
  // & IfExtends<
  //   {},
  //   ComponentDoc,
  //   // TComponentDoc 为{}时 增加'all'前缀验证
  //   ValidatorOfPrefix<DataDoc, Prefix>,
  //   IfExtends<
  //     unknown,
  //     ComponentDoc["properties"],
  //     // 组件无properties字段时  增加'inner'前缀验证 确保只可以书写内部字段
  //     ValidatorOfPrefix<DataDoc, Prefix, "inner">,
  //     // 组件有properties字段时
  //     & IfExtends<
  //       {},
  //       StandardOfTData,
  //       unknown,
  //       // standard字段不可超出范围
  //       & ValidationOver<StandardOfTData, ComponentDoc["properties"], () => `⚠️超出文档字段范围⚠️`>
  //       // standard字段类型验证 应为 TComponentDoc["properties"]相同key的子类型
  //       & ValidationValueType<StandardOfTData, ComponentDoc["properties"]>
  //     >
  //     & IfExtends<
  //       {},
  //       GetInner<DataDoc>,
  //       unknown,
  //       // 有内部字段验证前缀
  //       ValidatorOfPrefix<GetInner<DataDoc>, Prefix, "inner">
  //     >
  //   >
  // >;
};

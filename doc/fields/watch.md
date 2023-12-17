### watch字段说明文档

1. RootComponent.watch

   可定义(监控)所有数据字段(properties,data,store,computed中定义的),数据改变时(深度相等比较)运行定义函数,参数包含旧值,可监控多个字段或子字段。

   > 提示:ts开发时,监控computed字段需要手动写入类型(鼠标悬停在定义字段上可看到类型),单一子字段给了类型提示,多字段没有类型提示要手动ignore类型错误。

   ```ts
   import { DefineComponent, type DetailedType, RootComponent } from "annil";
   import { observable } from "mobx";

   type User = { name: string; age: number };

   const storeUser = observable({
     name: "zhao",
     age: 20,
     changeName(name: string) {
       this.name = name;
     },
   });

   const rootComponent = RootComponent()({
     properties: {
       user: Object as DetailedType<User>, // 默认null
     },
     data: {
       Duser: { name: "zhao", age: 20 },
     },
     store: {
       name: () => storeUser.name,
     },
     computed: {
       // 1. 引用必传的properties字段
       age() {
         return this.data.user?.age || 0;
       },
     },
     watch: {
       user(newValue, oldValue) {
         console.log(newValue, oldValue); // {name:'li',age:30}, null
       },
       "Duser.age"(newValue, oldValue) {
         console.log(newValue, oldValue); // 30, 20
       },
       name(newValue, oldValue) {
         console.log(newValue, oldValue); // "li", "zhao"
       },
       age(newValue, oldValue) {
         console.log(newValue, oldValue); // 30, 0
       },
     },
     lifetimes: {
       attached() {
         this.setData({
           "Duser.age": 30,
           // 模拟properteis.user传入新值
           user: { name: "li", age: 30 },
         });
         storeUser.changeName("li");
       },
     },
   });

   const watch = DefineComponent({
     name: "watch",
     rootComponent,
   });

   export type $Watch = typeof computed;
   ```

   [类型测试watchProperties](../../src/api/RootComponent/Watch/test/WatchProperties.test.ts)

   [类型测试watchData](../../src/api/RootComponent/Watch/test/WatchData.test.ts)

   [类型测试watchComputed](../../src/api/RootComponent/Watch/test/WatchComputed.test.ts)

   [类型错误示例](../../src/api/RootComponent/Watch/test/error.test.ts)

   [单元测试示例watch-computed](../../jest/watch/computed/computed.ts)

   [单元测试示例watch-data](../../jest/watch/data/data.ts)

   [单元测试示例watch-multipleFields](../../jest/watch/multipleFields/multipleFields.ts)

   [单元测试示例watch-properties](../../jest/watch/properties/properties.ts)

2. **SubComponent下的watch字段**

   不仅可定义根组件数据还可以定义自身定义数据

   [类型测试watchSubData](../../src/api/SubComponent/SubWatch/test/WatchSubData.test.ts)

   [类型测试watchRootData](../../src/api/SubComponent/SubWatch/test/WatchRootData.test.ts)

   [类型测试watchSubComputed](../../src/api/SubComponent/SubWatch/test/WatchComputed.test.ts)

   [类型错误示例](../../src/api/SubComponent/SubWatch/test/error.test.ts)

### computed字段说明文档

1. **RootComponent下的computed字段**

   可通过this.data引用properties,data,store定义的数据及其他计算属性字段,返回新的字段数据。

   > 提示:this下仅有data字段(关闭了其他字段),且this.data内部数据为只读,设计为this.data形式是便于ts类型推导也符合小程序调用数据习惯。

   ```ts
   import { DefineComponent, type DetailedType, RootComponent } from "annil";
   import { observable } from "mobx";

   type User = { name: string; age: number };

   const storeUser = observable({
     name: "zhao",
     age: 20,
   });

   const rootComponent = RootComponent()({
     properties: {
       user: Object as DetailedType<User>,
       userOptional: {
         type: Object as DetailedType<User>,
         value: { name: "zhao", age: 20 },
       },
     },
     data: {
       Duser: { name: "zhao", age: 20 },
     },
     store: {
       Sage: () => storeUser.age,
     },

     computed: {
       // 1. 引用必传的properties字段
       age() {
         return this.data.user?.age || 0;
       },
       // 2. 引用可选的properties字段
       name() {
         return this.data.userOptional?.name || "zhao";
       },
       // 3. 引用data字段
       Dname() {
         return this.data.Duser.name;
       },
       // 4. 引用store字段
       SagePlus() {
         return this.data.Sage + 1;
       },
       // 5. 引用其他计算属性
       refOtherComputedFields() {
         return this.data.age + this.data.SagePlus;
       },
       // 6. 运行时报错
       isError() {
         // @ts-expect-error 'num字段是只读的'
         this.data.num = 1;

         return 123;
       },
       // 7. ts下重复字段报错(与properties,data,store下字段对比)
       // @ts-expect-error 与data字段重复
       Duser() {
         return "xxx";
       },
     },
   });

   const computed = DefineComponent({
     name: "computed",
     rootComponent,
   });

   export type $Computed = typeof computed;
   ```

   [类型标准示例](../../src/api/RootComponent/Computed/test/normal.test.ts)

   [类型错误示例](../../src/api/RootComponent/Computed/test/error.test.ts)

   [单元测试示例](../../jest/computed/normal/normal.ts)

2. **SubComponent下的computed字段**

   使用同1,但在ts下有严格的类型约束(不允许定义非组件所需数据字段)

   [类型标准示例](../../src/api/SubComponent/SubComputed/test/normal.test.ts)

   [类型错误示例](../../src/api/SubComponent/SubComputed/test/error.test.ts)

   [单元测试示例](../../jest/computed/normal/normal.ts)

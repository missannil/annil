### 组件构建(设计)方案

> annil在构建组件(页面)时采用根组件(RootComponent)与子组件(SubComponent)组合的方式。需要注意的是,为了接收外部泛型,RootComponent和SubComponent都是高阶函数,需要两次调用。

1. 基础组件(baseComp)

   ```ts
   // components/baseComp/baseComp.ts
   import { DefineComponent, type DetailedType, RootComponent } from "annil";
   export type Gender = "male" | "female";
   export type Age = 16 | 17 | 18;
   const rootComponent = RootComponent()({ // 切记 两次调用
     properties: {
       gender: String as DetailedType<Gender>, // 必传属性 以constructor形式定义
       age: { // 选传属性带有value字段
         type: Number as DetailedType<Age>,
         value: 16, // 提供字段检测和类型检测
       },
     },
     // 定义triggerEvent事件
     customEvents: {
       tap: String as DetailedType<Gender>,
     },
     events: {
       onTap() {
         const { gender } = this.data;

         this.tap(gender); // this.triggerEvent('tap',gender)
       },
     },
     // ...
   });
   const baseComp = DefineComponent({
     name: "baseComp",
     rootComponent,
     // subComponents:[]
   });
   export type $BaseComp = typeof baseComp;

   // 组件文档类型
   // type $BaseComp = {
   //   properties: {
   //       baseComp_gender: Gender;  // 必传属性
   //       baseComp_age?: number;    // 选传属性
   //   };
   //   customEvents: {     // 组件事件
   //       baseComp_tap: Gender;
   //   };
   // }
   ```

2. 页面(index)

   ```html
   <!-- index.wxml -->
   <view id="A">
     <baseComp  age="{{baseComp_age}}" gender="{{baseComp_gender}}" tap="baseComp_tap"/>
   </view>
   ```

   ```ts
   // index.ts
   import { DefineComponent, type DetailedType, RootComponent } from "annil";
   import type { $BaseComp, Age, Gender } from "path/to/baseComp";
   export type User = {
     name: string;
     age?: number;
   };
   // 建立一个子组件(baseComp)选项配置
   const baseComp = SubComponent<Root, $BaseComp>()({ // 切记 两次调用
     inherit: { // 继承字段 用于表达组件需要的数据源自rootComponent的哪个数据。此字段运行时无意义,书写是为了类型验证。
       baseComp_age: "age",
     },
     data: {
       baseComp_gender: "female",
     },
     events: {
       baseComp_tap(e) {
         const gender = e.detail;

         this.rootMethods(gender);
       },
     },
   });

   type Root = typeof rootComponent;

   const rootComponent = RootComponent()({ // 切记 两次调用
     isPage: true, // 构建的是页面
     properties: {
       user: Object as DetailedType<User>,
     },
     data: {
       age: 16 as Age,
     },
     methods: {
       rootMethods(gender: Gender) {
         console.log(gender);
         // do something
       },
     },
     // ...
   });
   const index = DefineComponent({
     path: "/pages/index/index",
     rootComponent,
     subComponents: [baseComp],
   });

   export type $Index = typeof index;
   // 页面文档类型
   // type $Index = {
   //   path: "/pages/index/index";
   //   properties: {
   //       user: User;
   //   };
   // }
   ```

   > 从上面示例可以看出,annil是为ts而生(设计),每个组件(页面)都有自己的类型(好比组件文档)。在复杂组件(页面)中构建子组件代码逻辑时,SubComonent函数需要您输入根组件的类型(泛型参数一)和要构建的组件类型(泛型参数二),这样SubComonent函数会在您配置选项字段时给您字段提示和类型检测,在解决命名冲突和依赖混乱问题的同时,也解耦了组件逻辑代码,从而提高代码可读性和易拓展性。

3. **组件复用同一组件**

   > 有时可能会出现一个复杂组件中多次使用同一组件的情况,此时可通过输入后缀字段(SubComponent的第三个泛型参数)来避免字段重复问题。

   示例 demo

   ```html
   <!-- demo.wxml -->

     <baseComp id="baseCompA" gender="{{baseCompA_gender}}" tap="baseCompA_tap"/>

     <baseComp id="baseCompB" gender="{{baseCompInB_gender}}" tap="baseCompInB_tap"/>
   ```

   ```ts
   import { DefineComponent, type DetailedType, RootComponent } from "annil";
   import type { $BaseComp, Gender } from "path/to/baseComp";

   // SubComponent的第三个泛型输入为字段后缀,会以大驼峰形式加在组件前缀后面,
   const baseCompA = SubComponent<Root, $BaseComp, "aaa">()({
     data: {
       baseCompAaa_gender: "female",
     },
     events: {
       baseCompA_tap(e) {
         const gender = e.detail;

         this.rootMethods(gender);
       },
     },
   });
   const baseCompBbb = SubComponent<Root, $BaseComp, "bbb">()({
     data: {
       baseCompBbb_gender: "male",
     },
     events: {
       baseCompBbb_tap(e) {
         const gender = e.detail;

         this.rootMethods(gender);
       },
     },
   });
   type Root = typeof rootComponent;

   const rootComponent = RootComponent()({
     methods: {
       rootMethods(gender: Gender) {
         console.log(gender);
         // do something
       },
     },
     // ...
   });
   const index = DefineComponent({
     path: "/pages/index/index",
     rootComponent,
     subComponents: [baseCompA, baseCompInB],
   });
   ```

### 一些设计思想

1. **events**
   > 小程序原生API(Component)把事件函数定义在methods字段中固然简洁,但对阅读和维护代码是不友好的,故在RootComponent和SubComopnent接口中加入了events选项,定义在events中的事件函数无法通过this调用(ts类型约束),参数e拥有默认类型,也可自定类型(需在tsconfig中配置`"strictFunctionTypes": false`).

   ```ts
   const rootComponent = RootComponent()({
     data: {
       num: 1,
     },
     events: {
       // 事件默认有自己的事件类型e
       onTap(e) {
         const { num } = this.data;
         // ok 事件函数中可以调用实例上的方法
         this.add(num);
       },
     },
     methods: {
       add(num: number) {
         return num + 1;
       },
       error(num: number) {
         // @ts-expect-error 实例中无事件字段
         this.onTap;
       },
     },
   });
   ```

2. **customEvents**

   > 传统调用组件自定义事件的写法`this.triggerEvent("tap", { num: 1 }, { bubbles: true,});`是不友好的,RootComponent API提供了customEvents选项。

   ```ts
   type Gender = "male" | "female";
   const rootComponent = RootComponent()({
     data: {
       gender: "male" as Gender,
     },
     // 自定义事件字段更便于代码阅读和类型友好
     customEvents: {
       tap: {
         detail: String as DetailedType<Gender>,
         options: {
           bubbles: true,
           composed: true,
           capturePhase: true,
         },
       },
     },
     events: {
       onTap() {
         const { gender } = this.data;
         // 触发自定义事件 好比 `this.triggerEvent("tap", "male", { bubbles: true, composed: true, capturePhase: true });`
         this.tap(gender);
       },
     },
   });
   ```

3. **不允许对非data定义字段做数据改变**

   ```ts
   // storeUser.ts
   import { observable } from "mobx";

   type User = { name: string; age: number };

   export const storeUser = observable<User>({
     name: "zhao",
     age: 20,
   });
   ```
   ```ts
   import { DefineComponent, type DetailedType, RootComponent } from "annil";
   import { storeUser, type User } from "storeUser";

   const rootComponent = RootComponent()({
     properties: {
       user: Object as DetailedType<User>,
     },
     data: {
       num: 1,
     },
     store: {
       Sage: () => storeUser.age,
     },
     computed: {
       age() {
         return this.data.user?.age || 20;
       },
     },
     events: {
       onTap() {
         this.setData({
           num: 2, // ok
           // @ts-expect-error 组件无权对properties字段修改
           user: { name: "zhao", age: 20 },
           // @ts-expect-error 计算字段的更新源自依赖的数据改变,不可手动修改
           age: 30,
           // @ts-expect-error 响应式的数据改变源自store自身方法,不可手动修改
           Sage: 40,
         });
       },
     },
   });
   ```

4. **SubComponent——inherit**

为了检查子组件配置是否符合传入的子组件类型需求(必传字段检测),需要知道当前子组件选项配置中都定义和使用了哪些数据,若子组件数据使用的是根组件数据,为了告诉类型系统,所以需要一个描述字段——inherit。
当所有数据字段(inhrit,data,computed,store)不满足组件文档的必传数据时,SubComponent返回的类型是缺少的数据字段(字符串),这不符合DefineComopnent的subComponents字段的类型,从而报错。

```ts
import { DefineComponent, type DetailedType, RootComponent } from "annil";
import type { $BaseComp, Age, Gender } from "path/to/baseComp";
const baseComp = SubComponent<Root, $BaseComp>()({
  // inhrit: {
  //   baseComp_gender: "gender",
  // },
  data: {
    age: 18 as Age,
  },
});
type Root = typeof rootComponent;
const rootComponent = RootComponent()({
  data: {
    gender: "male" as Gender,
  },
  // ...
});
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  // @ts-expect-error  不能将 `缺少组件必传字段 baseComp_gender`类型分配给 _SubComponentDoc
  subComponents: [baseComp],
});
```

> 由于 baseComp子组件配置中缺少对$BaseComp类型中必传字段`baseComp_gender`的定义,所以baseComp的类型为`缺少组件必传字段 baseComp_gender`,导致DefineComponentAPI的subComponents字段报错。

### 书写规范

> 书写规范是通过ts类型约束的,包括但不限于以下情况。

1. 方法和事件应该分别定义
   > 把事件定义在方法字段中固然简洁,但对阅读和维护代码是不友好的,很容易写出手动调用事件方法的错误代码。

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
     // 方法中无法调用事件方法
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

1. 自定义事件应提前定义

   > 传统写法`this.triggerEvent("tap", { num: 1 }, { bubbles: true,});`是不友好的

   ```ts
   const rootComponent = RootComponent()({
     data: {
       num: 1,
     },
     // 自定义事件字段更便于代码阅读和类型友好
     customEvents: {
       tap: {
         detail: Number,
         options: {
           bubbles: true,
           composed: true,
           capturePhase: true,
         },
       },
     },
     events: {
       onTap() {
         const { num } = this.data;
         // 触发自定义事件
         this.tap(num);
       },
     },
   });
   ```

1. 不允许对非data定义字段做数据改变

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
     },
     data: {
       num: 1,
     },
     store: {
       Sage: () => storeUser.age,
     },
     computed: {
       age() {
         return this.data.user?.age || 0;
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

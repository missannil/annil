### SubComponent

SubComponent 是组件构建函数之一,搭配 [DefineComponent](./DefineComponent.md)和[SubComponent]使用。**特别注意：为了使用外部泛型,接口采用高阶函数,需要2次调用**
各选项说明如下：

- **inherit**

  是否可选: 可选

  类型: [InheritConstraint](../../src/api/SubComponent/SubInherit/SubInheritConstraint.ts)

  默认: { }

  说明:js可忽略,作为ts开发时类型辅助字段

  [标准示例](../../src/api/SubComponent/SubInherit/test/normal.test.ts)

  [类型错误示例](../../src/api/SubComponent/SubInherit/test/error.test.ts)

- **data**

  是否可选: 可选

  类型: [SubData](../../src/api/SubComponent/SubData/SubDataConstraint.ts)

  默认: { }

  [标准示例](../../src/api/SubComponent/Subdata/test/normal.test.ts)

  [类型错误示例](../../src/api/SubComponent/Subdata/test/error.test.ts)

- **computed**

  是否可选: 可选

  类型: [SubComputedConstraint](../../src/api/SubComponent/SubComputed/SubComputedConstraint.ts)

  默认: { }

  说明:

  [标准示例](../../src/api/SubComponent/SubComputed/test/normal.test.ts)

  [类型错误示例](../../src/api/SubComponent/SubComputed/test/error.test.ts)

  [测试用例](../../jest/computed/normal/normal.ts)

- **store**

  是否可选: 可选

  类型: [SubStoreConstraint](../../src/api/SubComponent/SubStore/SubStoreConstraint.ts)

  默认: {}

  说明: 定义引入的全局响应式数据字段(基于mobx),当store数据发生变化,实例数据随之变化。
  可通过disposer取消对定义字段的监控(this.disposer.storeFields())

  [标准示例](../../src/api/SubComponent/SubStore//test/normal.test.ts)

  [类型错误示例](../../src/api/SubComponent/SubStore/test/error.test.ts)

  [测试用例](../../jest/store/store.ts)

- **events**

  是否可选: 可选

  类型: [EventsConstraint](../../src/api/SubComponent/SubEvents/SubEventsConstraint.ts)

  默认: {}

  说明: 定义组件事件,参数e默认为基础事件类型,可(使用Detail,Dataset,Mark等泛型)自定义事件参数类型。当有子组件泛型传入时(ts),后冒泡/捕获/阻止事件提示字段

  [标准示例](../../src/api/SubComponent/SubEvents/test/normal.test.ts)

  [类型错误示例](../../src/api/SubComponent/SubEvents/test/error.test.ts)

  [测试用例](../../jest/events/events.ts)

- **watch**

  是否可选: 可选

  类型: [SubWatchOption](../../src/api/SubComponent/SubWatch/SubWatchOption.ts)

  默认: {}

  说明: 功能同原生observers字段,与observers不同的是深度相等比较和参数有旧值

  [监控properties](../../src/api/SubComponent/SubWatch/test/WatchProperties.test.ts)

  [监控computed](../../src/api/SubComponent/SubWatch/test/WatchComputed.test.ts)

  [监控data](../../src/api/SubComponent/SubWatch/test/WatchRootData.test.ts)

  [监控注入的store](../../src/api/SubComponent/SubWatch/test/WtachInject.test.ts)

  [类型错误示例](../../src/api/SubComponent/SubWatch/test/error.test.ts)

  [测试用例](../../jest/watch/)

- **pageLifetimes**

  同[RootComponent]的PageLifetimes

- **lifetimes**

  同[RootComponent]的lifetimes

- **observers**

  同[RootComponent]的observers

- **methods**

  同[RootComponent]的methods,有字段前缀检测

- **behaviors**

  同原生[Component] API 的behaviors选项。

- **externalClasses**

  同原生[Component] API 的externalClasses选项。

> 源码路径`/src/api/SubComponent/`

[RootComponent]: ./RootComponent.md

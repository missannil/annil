### RootComponent 接口

DefineComponent 是组件构建API其中之一,搭配 [RootComponent](./RootComponent.md) 和 [SubComponent](./SubComponent.md)使用,其选项继承大多原生Component接口选项(暂不支持 "definitionFilter","export"),新增和修改选项如下：

**新增**

- isPage

  是否可选: 页面时必需,组件时可选

  类型:boolean

  默认: false

  解释: 表示创建的组件类型(true为页面,false为组件),影响pageLifetime字段类型和DefineComponent接口的字段(path/name)

  [示例A和B](./DefineComponent.md)

- computed

  是否可选: 可选

  类型: boolean

  默认: {}

  解释: 定义实例的计算属性,函数体内可通过this.data获取实例数据,依赖实例的数据变化时会自动更新实例上定义字段的值。

  [测试用例](../../jest/computed/normal/normal.ts)

- store

  是否可选: 可选

  类型: [StoreConstraint](../../src/api/RootComponent/Store/StoreConstraint.ts)

  默认: {}

  解释: 定义实例上的响应式数据字段(基于mobx),当store数据发生变化,实例数据跟随变化。
  可通过实例方法disposer取消对store变化的监控(this.disposer.xxx())

  [测试用例](../../jest/store/store.ts)

- events

  是否可选: 可选

  类型: [EventsConstraint](../../src/api/RootComponent/Events/EventsConstraint.ts)

  默认: {}

  解释: 定义组件事件,参数e默认为基础事件类型,可(使用Detail,Dataset,Mark等泛型)自定义事件参数类型。

  [测试用例](../../jest/events/events.ts)

- customEvents

  是否可选: 可选

  类型: [CustomEventConstraint](../../src/api/RootComponent/CustomEvents/CustomEventConstraint.ts)

  默认: {}

  解释: 定义组件自定义事件,通过this直接触发

  [测试用例](../../jest/customEvents/customEvents.ts)

- watch

  是否可选: 可选

  类型: [WatchOption](../../src/api/RootComponent/Watch/WatchOption.ts)

  默认: {}

  解释: 功能同原生observers字段,与observers不同的是深度比较

  [测试用例](../../jest/watch/watch.ts)

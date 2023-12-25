### RootComponent

RootComponent 是组件构建函数之一,搭配 [DefineComponent](./DefineComponent.md) 和 [SubComponent](./SubComponent.md)使用,支持所有原生[Component] API选项,并增加了新的功能选项,具体如下:

> **特别注意:为了使用外部泛型,接口采用高阶函数,需要2次调用**

示例:

```ts
RootComponent()({
  properties: {
    // ...
  },
  data: {
    // ...
  },
  // ...
});
```

- **isPage**

  是否可选: 页面时必需为true,组件时可选

  类型:boolean

  默认: false

  说明: 表示创建的实例类型(true为页面,false为组件),影响pageLifetime字段类型和DefineComponent选项字段(path/name),有运行时检测。

  [示例A和B](./DefineComponent.md)

- **properties**

  是否可选: 可选

  类型:[PropertiesConstraint](../../src/api/RootComponent/Properties/PropertiesConstraint.ts)

  默认: { }

  说明: js开发时同原生Component的properties选项。ts开发时,字段类型不允许null,对象配置去除observer字段,可通过as [DetailedType](../../src/types/DetailedType.ts)定义任意类型,有字段检测和value类型检测。

  示例:

  [定义必需字段示例](../../src/api/RootComponent/Properties/test/normalRequired.test.ts)

  [定义可选字段示例](../../src/api/RootComponent/Properties/test/normalOptional.test.ts)

  [类型错误示例](../../src/api/RootComponent/Properties/test/error.test.ts)

- **computed**

  是否可选: 可选

  类型: [ComputedConstraint](../../src/api/RootComponent/Computed/ComputedConstraint.ts)

  默认: { }

  说明: 定义实例的计算属性,函数体内可通过this.datay引用其他实例数据(包括其他计算属性),依赖的实例数据变化时会自动更新。

  [标准示例](../../src/api/RootComponent/Computed/test/normal.test.ts)

  [类型错误示例](../../src/api/RootComponent/Computed/test/error.test.ts)

  [测试用例](../../jest/computed/normal/normal.ts)

- **store**

  是否可选: 可选

  类型: [StoreConstraint](../../src/api/RootComponent/Store/StoreConstraint.ts)

  默认: {}

  说明: 定义引入的全局响应式数据字段(基于mobx),当store数据发生变化,实例数据随之变化。
  可通过disposer取消对定义字段的监控(this.disposer.storeFields())

  [标准示例](../../src/api/RootComponent/Store/test/normal.test.ts)

  [类型错误示例](../../src/api/RootComponent/Store/test/error.test.ts)

  [测试用例](../../jest/store/store.ts)

- **events**

  是否可选: 可选

  类型: [EventsConstraint](../../src/api/RootComponent/Events/EventsConstraint.ts)

  默认: {}

  说明: 定义组件事件,参数e默认为基础事件类型,可(使用Detail,Dataset,Mark等泛型)自定义事件参数类型。当有子组件泛型传入时(ts),后冒泡/捕获/阻止事件提示字段

  [标准示例](../../src/api/RootComponent/Events/test/normal.test.ts)

  [类型错误示例](../../src/api/RootComponent/Events/test/error.test.ts)

  [测试用例](../../jest/events/events.ts)

- **customEvents**

  是否可选: 可选

  类型: [CustomEventConstraint](../../src/api/RootComponent/CustomEvents/CustomEventConstraint.ts)

  默认: {}

  说明: 定义组件自定义事件,通过this直接触发。在构建页面(isPage:true)时,无此字段。

  [标准示例](../../src/api/RootComponent/CustomEvents/test/normal.test.ts)

  [类型错误示例](../../src/api/RootComponent/CustomEvents/test/error.test.ts)

  [测试用例](../../jest/customEvents/customEvents.ts)

- **watch**

  是否可选: 可选

  类型: [WatchOption](../../src/api/RootComponent/Watch/WatchOption.ts)

  默认: {}

  说明: 功能同原生observers字段,与observers不同的是深度相等比较和参数有旧值

  [监控properties](../../src/api/RootComponent/Watch/test/WatchProperties.test.ts)

  [监控computed](../../src/api/RootComponent/Watch/test/WatchComputed.test.ts)

  [监控data](../../src/api/RootComponent/Watch/test/WatchData.test.ts)

  [监控注入的store](../../src/api/RootComponent/Watch/test/WtachInject.test.ts)

  [类型错误示例](../../src/api/RootComponent/Watch/test/error.test.ts)

  测试用例目录 `../../jest/watch`

- **pageLifetimes**

  是否可选: 可选

  类型: [PageLifetimesOption](../../src/api/RootComponent/PageLifetimes/PageLifetimesOption.ts)

  默认: {}

  说明: 构建组件(isPage不为true)时选项为[组件所在页面的生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html#%E7%BB%84%E4%BB%B6%E6%89%80%E5%9C%A8%E9%A1%B5%E9%9D%A2%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F),并加入了load生命周期(要求最低基础库 3.0.0)。构建页面时字段为[写在methods中的页面生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)。

  [标准示例](../../src/api/RootComponent/PageLifetimes/test/normal.test.ts)

  [错误示例](../../src/api/RootComponent/PageLifetimes/test/error.test.ts)

- **lifetimes**

  同原生[Component] API 的lifetimes选项(新增beforeCreate生命周期)

  [标准示例](../../src/api/RootComponent/Lifetimes/test/normal.test.ts)

  [错误示例](../../src/api/RootComponent/Lifetimes/test/error.test.ts)

- **observers**

  同原生[Component] API 的observers选项

  [标准示例](../../src/api/RootComponent/Observers/test/normal.test.ts)

- **data**

  同原生[Component] API 的data选项

  [标准示例](../../src/api/RootComponent/Data/test/normal.test.ts)

  [错误示例](../../src/api/RootComponent/Data/test/error.test.ts)

- **methods**

  同原生[Component] API 的methods选项

  [标准示例](../../src/api/RootComponent/Methods/test/mormal.test.ts)

  [错误示例](../../src/api/RootComponent/Methods/test/error.test.ts)

- **export**

  同原生[Component] API 的export选项 当包含`behaviors:['wx://component-export']` 时有效

- **externalClasses**

  同原生[Component] API 的externalClasses选项。

- **options**

  同原生[Component] API 的options选项。可通过[实例注入]()的方式避免每个组件重复定义相同类型。

- **relations**

  同原生[Component] API 的relations选项。

- **behaviors**

  同原生[Component] API 的behaviors选项。

> 源码路径`/src/api/RootComponent/`

[Component]: https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html
